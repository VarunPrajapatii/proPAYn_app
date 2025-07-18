import Image from "next/image";

const socialLinks = [
    {
        href: "https://www.linkedin.com/in/varun-prajapati-56430aa7/",
        label: "LinkedIn",
        svg: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
        ),
    },
    {
        href: "https://github.com/VarunPrajapatii",
        label: "GitHub",
        svg: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
        ),
    },
    {
        href: "https://x.com/varunprajapat15",
        label: "Twitter",
        svg: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
        ),
    },
    {
        href: "https://www.instagram.com/varunprajapatii/",
        label: "Instagram",
        svg: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.017 0C8.396 0 7.929.01 6.71.058 5.493.106 4.68.276 3.972.523c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.382 4.847.212 5.66.064 6.877.016 8.096.006 8.563.006 12.017c0 3.454.01 3.921.058 5.14.048 1.217.218 2.03.465 2.737.306.789.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.707.247 1.52.417 2.737.465 1.219.048 1.686.058 5.14.058 3.454 0 3.921-.01 5.14-.058 1.217-.048 2.03-.218 2.737-.465.789-.305 1.459-.718 2.126-1.384.666-.667 1.079-1.337 1.384-2.126.247-.707.417-1.52.465-2.737.048-1.219.058-1.686.058-5.14 0-3.454-.01-3.921-.058-5.14-.048-1.217-.218-2.03-.465-2.737-.305-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.707-.247-1.52-.417-2.737-.465C15.904.01 15.437.006 12.017.006L12.017 0zm0 2.17c3.404 0 3.808.012 5.15.058 1.243.057 1.915.267 2.364.442.594.231.018.506 1.688 1.176.5.5.936 1.094 1.176 1.688.175.449.385 1.121.442 2.364.046 1.342.058 1.746.058 5.15 0 3.404-.012 3.808-.058 5.15-.057 1.243-.267 1.915-.442 2.364-.231.594-.506 1.018-1.176 1.688-.5.5-1.094.936-1.688 1.176-.449.175-1.121.385-2.364.442-1.342.046-1.746.058-5.15.058-3.404 0-3.808-.012-5.15-.058-1.243-.057-1.915-.267-2.364-.442-.594-.231-1.018-.506-1.688-1.176-.5-.5-.936-1.094-1.176-1.688-.175-.449-.385-1.121-.442-2.364-.046-1.342-.058-1.746-.058-5.15 0-3.404.012-3.808.058-5.15.057-1.243.267-1.915.442-2.364.231-.594.506-1.018 1.176-1.688.5-.5 1.094-.936 1.688-1.176.449-.175 1.121-.385 2.364-.442 1.342-.046 1.746-.058 5.15-.058z"/>
                <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
        ),
    },
];

const Footer = () => {
    return (
        <footer className="w-full bg-gradient-to-b from-slate-50 to-slate-100 dark:from-gray-900 dark:to-black/50 border-t border-slate-200/50 dark:border-slate-700/50">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Main footer content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand section */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <Image
                                src="/header_Propayn_logo_dark.png"
                                height={40}
                                width={100}
                                alt="ProPAYn Logo"
                                className="rounded-lg bg-white/80 dark:bg-slate-800/80 p-2 shadow-sm"
                            />
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed max-w-sm">
                            Empowering your payments with security and simplicity. Experience the future of digital transactions.
                        </p>
                    </div>
                    
                    {/* Features section */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-lg">Features</h3>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <li className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                <span>Peer-to-Peer Transfers</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                <span>UPI & Card Integration</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                                <span>In-house Payment Gateway</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                                <span>Military-grade Encryption</span>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Connect section */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-lg">Connect</h3>
                        <div className="flex space-x-3">
                            {socialLinks.map(({ href, label, svg }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="group p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white hover:shadow-lg hover:scale-105"
                                >
                                    <div className="text-slate-600 dark:text-slate-400 group-hover:text-white transition-colors">
                                        {svg}
                                    </div>
                                </a>
                            ))}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
                            Demo project showcasing modern payment solutions
                        </p>
                    </div>
                </div>
                
                {/* Bottom section */}
                <div className="pt-8 border-t border-slate-200/50 dark:border-slate-700/50">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-sm text-slate-500 dark:text-slate-400 text-center md:text-left">
                            <p>
                                Made by{" "}
                                <a href="https://portfolio.varuntd.com" className="font-medium text-slate-700 dark:text-slate-300 hover:underline">Varun Prajapati</a>
                            </p>
                            <p className="mt-1">
                                All transactions are simulated for demo purposes • © 2025 proPAYn, Inc.
                            </p>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-slate-400 dark:text-slate-500">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span>Demo Environment</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
