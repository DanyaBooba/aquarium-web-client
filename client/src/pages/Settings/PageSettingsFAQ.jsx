import {
    Stack,
    Typography,
    AccordionSummary,
    Link,
    Sheet,
} from '@mui/joy';
import { CaretDown, ChatCircleDots, Compass, House, Note, Shield, User } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

import { AppProfile } from '../../components/app/App';
import LayoutSettings from '../../components/layout/LayoutSettings';

import faq from '../../data/faq/faq';
import { useState } from 'react';

function FAQAccordion() {
    const [expanded, setExpanded] = useState(false);

    const toggleAccordion = () => setExpanded((prev) => !prev);

    return (
        <Sheet
            variant="plain"
            sx={{
                p: 2,
                borderRadius: '12px',
            }}
        >
            <AccordionSummary
                onClick={toggleAccordion}
                indicator={null}
                sx={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    '& button': {
                        borderRadius: '50px',
                        px: 1,
                        mx: -1
                    },
                }}
            >
                <Typography level="title-md">Вопросы и разделы</Typography>
                <motion.div
                    animate={{ rotate: expanded ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    style={{ display: 'flex', alignItems: 'center' }}
                >
                    <CaretDown size={16} />
                </motion.div>
            </AccordionSummary>
            <motion.div
                initial={false}
                animate={{ height: expanded ? 'auto' : 0 }}
                transition={{
                    type: 'spring',
                    stiffness: 350,
                    damping: 30,
                    mass: 1,
                }}
                style={{ overflow: 'hidden' }}
            >
                <Stack spacing={1} sx={{ pt: 2, px: 2 }}>
                    {faq.map((section) => {
                        const sectionId = slugify(section.title);
                        return (
                            <Stack key={sectionId} spacing={0.5}>
                                <Link href={`#${sectionId}`}>{section.title}</Link>
                                <Stack pl={2}>
                                    {section.items.map((item) => {
                                        const qId = slugify(item.q);
                                        return (
                                            <Link
                                                key={qId}
                                                level="body-sm"
                                                href={`#${qId}`}
                                                sx={{ py: '2px' }}
                                            >
                                                {item.q}
                                            </Link>
                                        );
                                    })}
                                </Stack>
                            </Stack>
                        );
                    })}
                </Stack>
            </motion.div>
        </Sheet>
    );
}

function FAQList() {
    const LINK_CLASSES =
        'MuiLink-root MuiLink-colorPrimary MuiLink-body-md MuiLink-underlineHover css-6rd2co-JoyLink-root';

    const normalizeHtml = (html) => {
        if (!html) return '';

        return html.replace(
            /<a\s+(?![^>]*class=)([^>]*href="[^"]+"[^>]*)>/gi,
            `<a class="${LINK_CLASSES}" $1>`
        ).replace(
            /<a\s+([^>]*class=")([^"]*)"/gi,
            `<a $1$2 ${LINK_CLASSES}"`
        );
    };

    const showIcon = (icon) => {
        switch (icon) {
            case 'home':
                return <House />
            case 'profile':
                return <User />
            case 'posts':
                return <Note />
            case 'navigation':
                return <Compass />
            case 'security':
                return <Shield />
            case 'future':
                return <ChatCircleDots />
            default:
                return null;
        }
    }

    return faq.map((section) => {
        const sectionId = slugify(section.title);
        return (
            <Stack key={sectionId} spacing={1.5}>
                <Typography
                    id={sectionId}
                    level="h2"
                    startDecorator={showIcon(section?.icon ?? null)}
                    sx={{
                        mt: 1,
                        wordBreak: 'break-word'
                    }}
                >
                    {section.title}
                </Typography>

                <Stack pl={2} spacing={2}>
                    {section.items.map((item) => {
                        const qId = slugify(item?.q);
                        return (
                            <Stack key={qId} spacing={0.5}>
                                <Typography
                                    id={qId}
                                    level="h3"
                                >
                                    {item?.q}
                                </Typography>
                                <Typography level="body-md">
                                    <span dangerouslySetInnerHTML={{ __html: normalizeHtml(item?.a) }} />
                                </Typography>
                            </Stack>
                        );
                    })}
                </Stack>
            </Stack>
        );
    })
}

function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^a-zа-я0-9]+/gi, '-')
        .replace(/(^-|-$)/g, '');
}

export default function PageSettingsFAQ() {
    return (
        <AppProfile title="FAQ" desc="FAQ мессенджера Аквариум мини">
            <LayoutSettings header="FAQ">
                <Stack spacing={3} mt={2}>

                    {/* Оглавление */}
                    <FAQAccordion />

                    {/* FAQ */}
                    <FAQList />
                </Stack>
            </LayoutSettings>
        </AppProfile>
    );
}
