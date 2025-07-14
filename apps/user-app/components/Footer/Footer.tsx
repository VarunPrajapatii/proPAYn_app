import Image from "next/image";

const socialLinks = [
    {
        href: "https://instagram.com/",
        label: "Instagram",
        svg: (
            <svg fill="none" viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
                <rect width="24" height="24" rx="7" fill="currentColor" />
                <path d="M16.5 7.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-4.5 2.25A3.25 3.25 0 1 0 15.25 13 3.25 3.25 0 0 0 12 9.75Zm0 5.25a2 2 0 1 1 2-2 2 2 0 0 1-2 2Zm4.75-7.25a1.25 1.25 0 1 0 1.25 1.25A1.25 1.25 0 0 0 16.75 7.75ZM12 5.5A6.5 6.5 0 1 0 18.5 12 6.51 6.51 0 0 0 12 5.5Zm0 11A4.5 4.5 0 1 1 16.5 12 4.5 4.5 0 0 1 12 16.5Z" fill="#fff"/>
            </svg>
        ),
    },
    {
        href: "https://twitter.com/",
        label: "Twitter",
        svg: (
            <svg fill="none" viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
                <rect width="24" height="24" rx="7" fill="currentColor" />
                <path d="M19.633 7.997c.013.176.013.353.013.53 0 5.39-4.104 11.61-11.61 11.61-2.307 0-4.453-.676-6.26-1.84.32.037.637.05.97.05 1.92 0 3.687-.654 5.096-1.76-1.797-.037-3.317-1.22-3.843-2.85.25.037.5.062.763.062.367 0 .73-.05 1.07-.142-1.877-.377-3.29-2.034-3.29-4.025v-.05c.553.307 1.19.49 1.87.513A4.08 4.08 0 0 1 2.8 6.29c0-.75.2-1.45.553-2.05A11.62 11.62 0 0 0 12 8.29c-.062-.3-.1-.61-.1-.93 0-2.25 1.823-4.073 4.073-4.073 1.17 0 2.23.49 2.97 1.28a8.13 8.13 0 0 0 2.58-.98 4.07 4.07 0 0 1-1.79 2.25 8.17 8.17 0 0 0 2.34-.64 8.8 8.8 0 0 1-2.04 2.11Z" fill="#fff"/>
            </svg>
        ),
    },
    {
        href: "https://linkedin.com/",
        label: "LinkedIn",
        svg: (
            <svg fill="none" viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
                <rect width="24" height="24" rx="7" fill="currentColor" />
                <path d="M8.5 10.5v5h-2v-5h2Zm-1-1.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm4.5 1.5v5h-2v-5h2Zm1-1.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm4.5 1.5v5h-2v-2.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V15h-2v-5h2v.67c.41-.59 1.09-.67 1.5-.67 1.38 0 2.5 1.12 2.5 2.5V15h.01Z" fill="#fff"/>
            </svg>
        ),
    },
    {
        href: "https://github.com/",
        label: "GitHub",
        svg: (
            <svg fill="none" viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
                <rect width="24" height="24" rx="7" fill="currentColor" />
                <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.48 2.87 8.28 6.84 9.63.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.36 9.36 0 0 1 12 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .26.18.57.69.48C19.13 20.54 22 16.74 22 12.26 22 6.58 17.52 2 12 2Z" fill="#fff"/>
            </svg>
        ),
    },
];

const Footer = () => {
    return (
        <footer
            className="
                w-full
                bg-gradient-to-b
                from-slate-50 to-slate-100
                dark:from-gray-900 dark:to-black/50
                text-slate-700 dark:text-slate-100
                px-6 py-8
                flex flex-col md:flex-row items-center justify-between
                gap-6
                transition-colors
            "
        >
            <div className="flex items-center gap-4">
                <Image
                    src="/header_Propayn_logo_dark.png"
                    height={48}
                    width={120}
                    alt="ProPAYn Logo"
                    className="rounded-md bg-white/70 dark:bg-white/10 p-1"
                />
            </div>
            <div className="text-center md:text-left flex-1">
                <p className="text-base font-medium">
                    Empowering your payments, securely and instantly.<br className="hidden md:block" />
                    <span className="text-sm text-slate-500 dark:text-slate-300">
                        Made by Varun Prajapati. All transactions are simulated for demo purposes. &copy; 2025 proPAYn, Inc.
                    </span>
                </p>
            </div>
            <div className="flex gap-4">
                {socialLinks.map(({ href, label, svg }) => (
                    <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="
                            transition
                            text-slate-400 hover:text-blue-600 dark:text-slate-500 dark:hover:text-blue-300
                            bg-slate-100 dark:bg-blue-800
                            rounded-full p-2
                            shadow-sm hover:shadow-lg
                        "
                    >
                        {svg}
                    </a>
                ))}
            </div>
        </footer>
    );
}

export default Footer;

// ProPAYn is a project made by Varun. All money transmission is provided by dummy money. © 2024 ProPAYn, Inc.
