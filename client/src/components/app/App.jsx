import Container from '@mui/joy/Container'
import { Helmet } from 'react-helmet-async'

export function AppBasic({ title, desc, children }) {
    const titlePage = title ? `${title} — Аквариум` : `Аквариум — мессенджер с записями`
    const descPage = desc ? desc : 'Аквариум — мессенджер с записями'

    return (
        <>
            <Helmet>
                <title>{titlePage}</title>
                <meta name="description" content={descPage} />
                <meta property="og:title" content={descPage} />
                <meta property="og:description" content={titlePage} />
            </Helmet>
            {children}
        </>
    )
}

export function AppClear(props) {
    return <main><AppBasic {...props} /></main>
}

export function AppProfile({ children, containerSx, nonav = false, ...props }) {
    return (
        <AppBasic {...props}>
            <div className="app">
                <Container maxWidth="sm" className="profile" sx={{ ...containerSx }}>
                    <main style={{ marginBottom: '8rem' }}>
                        {children}
                    </main>
                </Container>
            </div>
        </AppBasic>
    )
}
