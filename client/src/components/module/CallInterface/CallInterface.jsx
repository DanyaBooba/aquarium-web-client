import { useEffect, useRef, useState } from 'react';
import { Modal, ModalDialog, Box, Typography, Stack } from '@mui/joy';
import { rtcConfig } from '../../../config/webrtcConfig';
import ShowMyVideo from './ShowMyVideo';
import ButtonsIncoming from './ButtonsIncoming';
import ButtonsOutcoming from './ButtonsOutcoming';
import ShowPersonVideo from './ShowPersonVideo';
import BackgroundBlobs from './BackgroundBlobs';

export default function CallInterface({
    socket,
    currentUserId,
    targetUser,
    isIncomingCall,
    incomingOfferRef,
    isReconnect,
    onClose
}) {
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [callStatus, setCallStatus] = useState(isIncomingCall ? 'incoming' : 'calling');
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);

    const peerConnection = useRef(null);
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const ringAudioRef = useRef(null);
    const localStreamRef = useRef(null);

    const candidatesQueue = useRef([]);

    const startOutgoingCall = async (stream) => {
        socket.emit('call:start', {
            toUserId: targetUser.id,
            callerInfo: {
                firstName: targetUser.firstName ?? '',
                lastName: targetUser.lastName ?? '',
                avatar: targetUser.avatar ?? '',
            }
        });

        createPeerConnection(stream);

        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);

        await new Promise((resolve) => {
            if (peerConnection.current.iceGatheringState === 'complete') {
                return resolve();
            }
            peerConnection.current.onicegatheringstatechange = () => {
                if (peerConnection.current.iceGatheringState === 'complete') resolve();
            };
            setTimeout(resolve, 3000);
        });

        const finalOffer = peerConnection.current.localDescription;
        // console.log('Sending offer, type:', finalOffer?.type, 'candidates in SDP:',
        //     (finalOffer?.sdp?.match(/a=candidate/g) || []).length);

        socket.emit('call:offer', { toUserId: targetUser.id, offer: finalOffer });
    };

    useEffect(() => {
        let mounted = true;

        const initMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'user' },
                    audio: true
                });

                if (!mounted) { stream.getTracks().forEach(t => t.stop()); return; }

                setLocalStream(stream);
                localStreamRef.current = stream;

                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                    localVideoRef.current.play().catch(() => { });
                }

                if (!isIncomingCall) {
                    await startOutgoingCall(stream);
                }

            } catch (err) {
                console.error('Media error:', err);
                onClose();
            }
        };

        initMedia();
        return () => { mounted = false; cleanup(); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!isReconnect) return;

        // Ждём пока появится и стрим и оффер, затем авто-принимаем
        const interval = setInterval(() => {
            if (localStreamRef.current && incomingOfferRef.current) {
                clearInterval(interval);
                acceptCall();
            }
        }, 100);

        const timeout = setTimeout(() => clearInterval(interval), 15000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isReconnect]);

    useEffect(() => {
        if (!socket) return;

        const handleAnswer = async ({ answer }) => {
            if (peerConnection.current && peerConnection.current.signalingState !== 'stable') {
                try {
                    await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
                    setCallStatus('connected');
                } catch (e) {
                    console.error("Error setting remote answer:", e);
                }
            }
        };

        const handleIce = async ({ candidate }) => {
            const iceCandidate = new RTCIceCandidate(candidate);

            if (peerConnection.current && peerConnection.current.remoteDescription) {
                try {
                    await peerConnection.current.addIceCandidate(iceCandidate);
                } catch (e) {
                    console.error("Error adding ice candidate", e);
                }
            } else {
                // console.log("Buffering ICE candidate...");
                candidatesQueue.current.push(iceCandidate);
            }
        };

        const handleEnd = () => {
            onClose();
        };

        const handleRestart = async ({ toUserId }) => {
            // Закрываем старый PeerConnection
            if (peerConnection.current) {
                peerConnection.current.close();
                peerConnection.current = null;
            }

            // Создаём новый и отправляем оффер
            const stream = localStreamRef.current;
            if (!stream) return;

            createPeerConnection(stream);

            const offer = await peerConnection.current.createOffer();
            await peerConnection.current.setLocalDescription(offer);

            await new Promise((resolve) => {
                if (peerConnection.current.iceGatheringState === 'complete') return resolve();
                peerConnection.current.onicegatheringstatechange = () => {
                    if (peerConnection.current.iceGatheringState === 'complete') resolve();
                };
                setTimeout(resolve, 3000);
            });

            socket.emit('call:offer', {
                toUserId,
                offer: peerConnection.current.localDescription
            });
        };

        socket.on('call:answer', handleAnswer);
        socket.on('call:ice', handleIce);
        socket.on('call:end', handleEnd);
        socket.on('call:restart', handleRestart);

        return () => socket.off('call:restart', handleRestart);
    }, [socket, onClose]);

    useEffect(() => {
        const audio = ringAudioRef.current;
        if (!audio) return;

        if (callStatus === 'calling' || callStatus === 'incoming') {
            audio.play().catch(() => { });
        } else {
            audio.pause();
            audio.currentTime = 0;
        }
    }, [callStatus]);

    const createPeerConnection = (stream) => {
        if (peerConnection.current) return;

        peerConnection.current = new RTCPeerConnection(rtcConfig);

        peerConnection.current.onconnectionstatechange = () => {
            const state = peerConnection.current.connectionState;
            // console.log('Connection state:', state);
            if (state === 'connected') setCallStatus('connected');
            if (state === 'failed' || state === 'disconnected') {
                console.warn('Connection failed, attempting restart...');
                // Можно добавить логику переподключения
            }
        };

        peerConnection.current.oniceconnectionstatechange = () => {
            // console.log('ICE state:', peerConnection.current.iceConnectionState);
        };

        stream.getTracks().forEach(track => {
            peerConnection.current.addTrack(track, stream);
        });

        peerConnection.current.ontrack = (event) => {
            const remote = event.streams[0];
            setRemoteStream(remote);
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = remote;
                remoteVideoRef.current.play().catch(() => { });
            }
        };

        peerConnection.current.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('call:ice', {
                    toUserId: targetUser.id,
                    candidate: event.candidate
                });
            }
        };
    };

    const processCandidateQueue = async () => {
        if (!peerConnection.current) return;

        // console.log(`Processing ${candidatesQueue.current.length} buffered candidates`);
        while (candidatesQueue.current.length > 0) {
            const candidate = candidatesQueue.current.shift();
            try {
                await peerConnection.current.addIceCandidate(candidate);
            } catch (e) {
                console.error("Error processing buffered candidate", e);
            }
        }
    };

    const acceptCall = async () => {
        const offer = await new Promise((resolve) => {
            if (incomingOfferRef.current) {
                return resolve(incomingOfferRef.current);
            }

            // console.log('Offer ещё не пришёл, ждём...');
            const interval = setInterval(() => {
                if (incomingOfferRef.current) {
                    clearInterval(interval);
                    resolve(incomingOfferRef.current);
                }
            }, 100);
            setTimeout(() => {
                clearInterval(interval);
                resolve(null);
            }, 10000);
        });

        if (!offer) {
            console.error('Offer так и не пришёл за 10 секунд');
            return;
        }

        const stream = localStream || await new Promise((resolve) => {
            const interval = setInterval(() => {
                if (localStream) { clearInterval(interval); resolve(localStream); }
            }, 100);
            setTimeout(() => { clearInterval(interval); resolve(null); }, 5000);
        });

        if (!stream) { console.error('Не удалось получить медиапоток'); return; }

        createPeerConnection(stream);

        try {
            await peerConnection.current.setRemoteDescription(
                new RTCSessionDescription(offer)
            );
            await processCandidateQueue();

            const answer = await peerConnection.current.createAnswer();
            await peerConnection.current.setLocalDescription(answer);

            socket.emit('call:answer', { toUserId: targetUser.id, answer });
            setCallStatus('connected');
        } catch (e) {
            console.error('acceptCall error:', e);
        }
    };

    const endCall = () => {
        if (socket && targetUser) {
            socket.emit('call:end', { toUserId: targetUser.id });
        }
        onClose();
    };

    const cleanup = () => {
        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach(track => track.stop());
            localStreamRef.current = null;
        }
        if (peerConnection.current) {
            peerConnection.current.close();
            peerConnection.current = null;
        }
    };

    const toggleMute = () => {
        if (localStream) {
            const audioTrack = localStream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                setIsMuted(!audioTrack.enabled);
            }
        }
    };

    const toggleVideo = () => {
        if (localStream) {
            const videoTrack = localStream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
                setIsVideoOff(!videoTrack.enabled);
            }
        }
    };

    return (
        <>
            <audio ref={ringAudioRef} src="/sounds/ringtone.mp3" loop />
            <Modal open={true} onClose={() => { }}>
                <ModalDialog
                    variant="outlined"
                    layout="center"
                    sx={{
                        width: '100vw',
                        height: '100dvh',
                        maxWidth: '100%',
                        maxHeight: '100%',
                        p: 0,
                        overflow: 'hidden',
                        borderRadius: '0px !important',
                        border: 'none',
                        bgcolor: '#4a0080',
                    }}
                >
                    <BackgroundBlobs />

                    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                        <ShowPersonVideo
                            remoteVideoRef={remoteVideoRef}
                            remoteStream={remoteStream}
                        />

                        {!remoteStream && (
                            <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                <Stack alignItems="center" spacing={2}>
                                    <Typography level="h3" textColor="common.white">
                                        {callStatus === 'incoming' ? 'Входящий звонок' : 'Исходящий звонок'}
                                    </Typography>
                                </Stack>
                            </Box>
                        )}

                        <ShowMyVideo
                            localVideoRef={localVideoRef}
                            showVideo={!isVideoOff}
                        />

                        <Box sx={{
                            position: 'absolute',
                            bottom: 40,
                            left: 0,
                            right: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 3,
                            zIndex: 3
                        }}>
                            {callStatus === 'incoming' ? (
                                <ButtonsIncoming
                                    endCall={endCall}
                                    acceptCall={acceptCall}
                                />
                            ) : (
                                <ButtonsOutcoming
                                    isMuted={isMuted}
                                    toggleMute={toggleMute}
                                    endCall={endCall}
                                    isVideoOff={isVideoOff}
                                    toggleVideo={toggleVideo}
                                />
                            )}
                        </Box>
                    </Box>
                </ModalDialog>
            </Modal>
        </>
    );
}
