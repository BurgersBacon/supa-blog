const Link = (({ href, label }) => {
    return (
        <a 
            target="_blank"
            rel="noopener noreferrer"
            href={href}
        >
            {label}
        </a>
    )
})

export default Link