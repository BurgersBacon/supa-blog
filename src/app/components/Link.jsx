const Link = (({ href, label, onClick }) => {
    return (
        <a 
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClick}
            href={href}
        >
            {label}
        </a>
    )
})

export default Link