
export default function PlayPause({ isPlay }) {
    const iconStyle = {
        opacity: isPlay ? 0 : 1,
        visibility: isPlay  ? 'hidden' : 'visible',
        transition: 'all .3s ease-in',
        transform: isPlay ? 'scale(1.5)' : 'scale(1)',
        cursor:'pointer',
        display: isPlay ? 'none' : 'block'
    }
    return (
        <div style={iconStyle}>
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="32" fill="white" />
                {!isPlay ? <path d="M27 24V40L40 32L27 24Z" stroke="#FF2E2E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> : (<>
                    <path d="M29 25H27C26.4477 25 26 25.4477 26 26V38C26 38.5523 26.4477 39 27 39H29C29.5523 39 30 38.5523 30 38V26C30 25.4477 29.5523 25 29 25Z" stroke="#FF2E2E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M37 25H35C34.4477 25 34 25.4477 34 26V38C34 38.5523 34.4477 39 35 39H37C37.5523 39 38 38.5523 38 38V26C38 25.4477 37.5523 25 37 25Z" stroke="#FF2E2E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </>)}
            </svg>
        </div>
    )
}
