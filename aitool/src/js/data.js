const toolsData = [
    {
        id: 1, title: "ChatGPT Plus", category: "ai", categoryLabel: "AI Models",
        description: "Advanced conversational AI by OpenAI, capable of complex reasoning, coding, and creative writing.",
        icon: "🤖", price: "$20/mo", link: "#", rating: 4.9, users: "100M+",
        isTrending: true, isFeatured: true, isEditorsChoice: true, isRecommended: true, isPopular: true, isNew: false,
        // Extended Details for Tool Page
        heroBanner: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200&h=400",
        overview: "ChatGPT Plus is a premium subscription for OpenAI's cutting-edge AI. It provides faster response times, priority access to new features like GPT-4, advanced data analysis, and plugin support, making it an indispensable tool for developers, writers, and researchers alike.",
        features: [
            "Access to GPT-4, OpenAI's most capable model",
            "Advanced Data Analysis for interpreting CSVs and datasets",
            "DALL-E 3 image generation built directly into the chat",
            "Custom GPTs to build tailored AI assistants",
            "Web browsing capabilities for real-time information",
            "Faster response times during peak hours"
        ],
        pricingDetails: [
            { plan: "Free", price: "$0", features: ["Access to GPT-3.5", "Standard response speed", "Regular model updates"] },
            { plan: "Plus", price: "$20/mo", features: ["Access to GPT-4", "Faster response speed", "Priority access to new features", "DALL-E 3"] },
            { plan: "Team", price: "$25/mo/user", features: ["Everything in Plus", "Higher message caps", "Admin workspace console", "No data training"] }
        ],
        pros: ["Unmatched reasoning capabilities", "Massive context window", "Constant feature updates", "Versatile plugin ecosystem"],
        cons: ["Can still hallucinate facts", "Strict usage caps on GPT-4", "Requires monthly subscription"],
        faqs: [
            { q: "Is there a free version?", a: "Yes, OpenAI offers a free version powered by GPT-3.5." },
            { q: "Can it generate images?", a: "Yes, ChatGPT Plus includes DALL-E 3 which can generate highly accurate images from text." },
            { q: "Is my data used for training?", a: "By default yes, but you can turn off chat history or upgrade to the Team plan to prevent data training." }
        ],
        reviews: [
            { user: "Sarah J.", rating: 5, date: "Oct 2025", text: "This tool has completely changed how I write code. It catches bugs instantly." },
            { user: "Mike R.", rating: 4, date: "Sep 2025", text: "Incredible AI, though the usage limits on GPT-4 can be annoying during heavy workdays." },
            { user: "Elena C.", rating: 5, date: "Aug 2025", text: "The advanced data analysis feature saves me 10 hours a week in Excel." }
        ]
    },
    {
        id: 2, title: "Midjourney", category: "design", categoryLabel: "Design",
        description: "Generate breathtaking, high-quality images and art from text descriptions via Discord.",
        icon: "🎨", price: "$10/mo", link: "#", rating: 4.8, users: "15M+",
        isTrending: true, isFeatured: true, isEditorsChoice: false, isRecommended: true, isPopular: true, isNew: false
    },
    {
        id: 3, title: "Adobe Acrobat Pro", category: "pdf", categoryLabel: "PDF Utilities",
        description: "The industry standard for creating, editing, and managing PDF documents securely.",
        icon: "📄", price: "$19.99/mo", link: "#", rating: 4.7, users: "50M+",
        isTrending: false, isFeatured: true, isEditorsChoice: true, isRecommended: false, isPopular: true, isNew: false
    },
    {
        id: 4, title: "iLovePDF", category: "pdf", categoryLabel: "PDF Utilities",
        description: "Online tools to merge, split, compress and convert PDFs easily and for free.",
        icon: "❤️", price: "Free", link: "#", rating: 4.9, users: "20M+",
        isTrending: true, isFeatured: false, isEditorsChoice: false, isRecommended: true, isPopular: true, isNew: false
    },
    {
        id: 5, title: "Jasper", category: "writing", categoryLabel: "Writing",
        description: "AI copywriter that helps you create high-quality content for blogs, ads, and emails 10x faster.",
        icon: "✍️", price: "$39/mo", link: "#", rating: 4.6, users: "1M+",
        isTrending: false, isFeatured: true, isEditorsChoice: false, isRecommended: true, isPopular: false, isNew: false
    },
    {
        id: 6, title: "Notion AI", category: "ai", categoryLabel: "Productivity",
        description: "Write better, think bigger, and get more done faster right inside your Notion workspace.",
        icon: "📓", price: "$10/mo", link: "#", rating: 4.8, users: "30M+",
        isTrending: true, isFeatured: false, isEditorsChoice: true, isRecommended: true, isPopular: true, isNew: true
    },
    {
        id: 7, title: "Claude 3", category: "ai", categoryLabel: "AI Models",
        description: "Next-generation AI model by Anthropic, excellent for coding and long-form analysis.",
        icon: "🧠", price: "Free", link: "#", rating: 4.9, users: "5M+",
        isTrending: true, isFeatured: true, isEditorsChoice: true, isRecommended: true, isPopular: false, isNew: true
    },
    {
        id: 8, title: "Smallpdf", category: "pdf", categoryLabel: "PDF Utilities",
        description: "A lightweight, easy-to-use tool to edit, compress, and sign PDF files.",
        icon: "📦", price: "Freemium", link: "#", rating: 4.7, users: "10M+",
        isTrending: false, isFeatured: false, isEditorsChoice: false, isRecommended: false, isPopular: true, isNew: false
    },
    {
        id: 9, title: "Figma AI", category: "design", categoryLabel: "Design",
        description: "AI-powered design generation directly within your Figma canvas.",
        icon: "🖌️", price: "$12/mo", link: "#", rating: 4.8, users: "4M+",
        isTrending: true, isFeatured: true, isEditorsChoice: true, isRecommended: true, isPopular: false, isNew: true
    },
    {
        id: 10, title: "Github Copilot", category: "coding", categoryLabel: "Coding",
        description: "Your AI pair programmer that suggests code and entire functions in real-time.",
        icon: "💻", price: "$10/mo", link: "#", rating: 4.9, users: "2M+",
        isTrending: true, isFeatured: true, isEditorsChoice: true, isRecommended: true, isPopular: true, isNew: false
    }
];

const categoryData = [
    { id: 'chatbots', title: 'AI Chatbots', icon: '🤖', count: '1,204 tools' },
    { id: 'writing', title: 'AI Writing', icon: '✍️', count: '980 tools' },
    { id: 'coding', title: 'AI Coding', icon: '💻', count: '450 tools' },
    { id: 'image-generator', title: 'AI Image Generator', icon: '🎨', count: '670 tools' },
    { id: 'video-generator', title: 'AI Video Generator', icon: '🎥', count: '320 tools' },
    { id: 'voice-generator', title: 'AI Voice Generator', icon: '🎙️', count: '290 tools' },
    { id: 'music-generator', title: 'AI Music Generator', icon: '🎵', count: '210 tools' },
    { id: 'presentation-maker', title: 'AI Presentation Maker', icon: '📊', count: '150 tools' },
    { id: 'website-builder', title: 'AI Website Builder', icon: '🌐', count: '180 tools' },
    { id: 'logo-generator', title: 'AI Logo Generator', icon: '✨', count: '140 tools' },
    { id: 'resume-builder', title: 'AI Resume Builder', icon: '📄', count: '110 tools' },
    { id: 'search-engine', title: 'AI Search Engine', icon: '🔍', count: '85 tools' },
    { id: 'translator', title: 'AI Translator', icon: '🌐', count: '160 tools' },
    { id: 'summarizer', title: 'AI Summarizer', icon: '📝', count: '220 tools' },
    { id: 'grammar-checker', title: 'AI Grammar Checker', icon: '✅', count: '130 tools' },
    { id: 'email-writer', title: 'AI Email Writer', icon: '✉️', count: '190 tools' },
    { id: 'marketing', title: 'AI Marketing', icon: '📈', count: '410 tools' },
    { id: 'seo', title: 'AI SEO', icon: '🎯', count: '280 tools' },
    { id: 'social-media', title: 'AI Social Media', icon: '📱', count: '360 tools' },
    { id: 'productivity', title: 'AI Productivity', icon: '⚡', count: '520 tools' },
    { id: 'automation', title: 'AI Automation', icon: '⚙️', count: '340 tools' },
    { id: 'education', title: 'AI Education', icon: '🎓', count: '270 tools' },
    { id: 'research', title: 'AI Research', icon: '🔬', count: '190 tools' },
    { id: 'finance', title: 'AI Finance', icon: '💰', count: '160 tools' },
    { id: 'healthcare', title: 'AI Healthcare', icon: '⚕️', count: '110 tools' },
    { id: 'data-analysis', title: 'AI Data Analysis', icon: '📊', count: '240 tools' },
    { id: 'customer-support', title: 'AI Customer Support', icon: '🎧', count: '310 tools' },
    { id: 'meeting-assistant', title: 'AI Meeting Assistant', icon: '📅', count: '180 tools' },
    { id: 'avatar-generator', title: 'AI Avatar Generator', icon: '👤', count: '150 tools' },
    { id: 'face-swap', title: 'AI Face Swap', icon: '🎭', count: '90 tools' },
    { id: 'background-remover', title: 'AI Background Remover', icon: '🖼️', count: '120 tools' },
    { id: 'upscaler', title: 'AI Upscaler', icon: '⬆️', count: '140 tools' },
    { id: 'ocr', title: 'AI OCR', icon: '👁️', count: '80 tools' },
    { id: 'text-to-speech', title: 'AI Text-to-Speech', icon: '🗣️', count: '260 tools' },
    { id: 'speech-to-text', title: 'AI Speech-to-Text', icon: '👂', count: '230 tools' },
    { id: 'prompt-generator', title: 'AI Prompt Generator', icon: '💡', count: '170 tools' },
    { id: 'sql-generator', title: 'AI SQL Generator', icon: '🗄️', count: '60 tools' },
    { id: 'thumbnail-generator', title: 'AI Thumbnail Generator', icon: '🖼️', count: '110 tools' },
    { id: 'interior-design', title: 'AI Interior Design', icon: '🛋️', count: '90 tools' },
    { id: 'fashion', title: 'AI Fashion', icon: '👗', count: '70 tools' },
    { id: 'story-generator', title: 'AI Story Generator', icon: '📖', count: '130 tools' },
    { id: 'pdf-chat', title: 'AI PDF Chat', icon: '💬', count: '150 tools' },
    { id: 'document-analyzer', title: 'AI Document Analyzer', icon: '📑', count: '120 tools' },
    { id: 'document-generator', title: 'AI Document Generator', icon: '📄', count: '140 tools' },
    { id: 'workflow-automation', title: 'AI Workflow Automation', icon: '🔄', count: '210 tools' },
    { id: 'spreadsheet-tools', title: 'AI Spreadsheet Tools', icon: '📊', count: '160 tools' },
    { id: 'calendar-assistant', title: 'AI Calendar Assistant', icon: '📆', count: '90 tools' },
    { id: 'note-taking', title: 'AI Note Taking', icon: '📓', count: '180 tools' },
    { id: 'mind-map-generator', title: 'AI Mind Map Generator', icon: '🧠', count: '70 tools' },
    { id: 'coding-assistant', title: 'AI Coding Assistant', icon: '👨‍💻', count: '220 tools' },
    { id: 'legal-assistant', title: 'AI Legal Assistant', icon: '⚖️', count: '80 tools' },
    { id: 'recruiting', title: 'AI Recruiting', icon: '🤝', count: '110 tools' },
    { id: 'travel', title: 'AI Travel', icon: '✈️', count: '60 tools' },
    { id: 'gaming', title: 'AI Gaming', icon: '🎮', count: '140 tools' },
    { id: 'e-commerce', title: 'AI E-commerce', icon: '🛒', count: '250 tools' },
    { id: 'word-to-pdf', title: 'Word to PDF', icon: '📄', count: '120 tools' },
    { id: 'pdf-to-word', title: 'PDF to Word', icon: '📝', count: '130 tools' },
    { id: 'ppt-to-pdf', title: 'PowerPoint to PDF', icon: '📊', count: '90 tools' },
    { id: 'pdf-to-ppt', title: 'PDF to PowerPoint', icon: '📈', count: '85 tools' },
    { id: 'excel-to-pdf', title: 'Excel to PDF', icon: '📗', count: '95 tools' },
    { id: 'pdf-to-excel', title: 'PDF to Excel', icon: '📊', count: '100 tools' },
    { id: 'pdf-to-jpg', title: 'PDF to JPG', icon: '🖼️', count: '150 tools' },
    { id: 'jpg-to-pdf', title: 'JPG to PDF', icon: '📷', count: '160 tools' },
    { id: 'edit-pdf', title: 'Edit PDF', icon: '✏️', count: '210 tools' },
    { id: 'merge-pdf', title: 'Merge PDF', icon: '🔗', count: '180 tools' },
    { id: 'split-pdf', title: 'Split PDF', icon: '✂️', count: '170 tools' },
    { id: 'compress-pdf', title: 'Compress PDF', icon: '🗜️', count: '190 tools' },
    { id: 'protect-pdf', title: 'Protect PDF', icon: '🔒', count: '110 tools' },
    { id: 'unlock-pdf', title: 'Unlock PDF', icon: '🔓', count: '105 tools' },
    { id: 'sign-pdf', title: 'Sign PDF', icon: '🖋️', count: '140 tools' },
    { id: 'watermark-pdf', title: 'Watermark PDF', icon: '©️', count: '80 tools' },
    { id: 'rotate-pdf', title: 'Rotate PDF', icon: '🔄', count: '95 tools' },
    { id: 'organize-pdf', title: 'Organize PDF', icon: '🗂️', count: '120 tools' },
    { id: 'delete-pages', title: 'Delete Pages', icon: '🗑️', count: '75 tools' },
    { id: 'extract-pages', title: 'Extract Pages', icon: '📑', count: '85 tools' },
    { id: 'repair-pdf', title: 'Repair PDF', icon: '🔧', count: '60 tools' },
    { id: 'crop-pdf', title: 'Crop PDF', icon: '📐', count: '70 tools' },
    { id: 'compare-pdf', title: 'Compare PDF', icon: '⚖️', count: '50 tools' },
    { id: 'number-pages', title: 'Number Pages', icon: '🔢', count: '65 tools' },
    { id: 'html-to-pdf', title: 'HTML to PDF', icon: '🌐', count: '110 tools' },
    { id: 'ocr-pdf', title: 'OCR PDF', icon: '👁️', count: '140 tools' },
    { id: 'scan-to-pdf', title: 'Scan to PDF', icon: '🖨️', count: '90 tools' },
    { id: 'translate-pdf', title: 'Translate PDF', icon: '🌍', count: '100 tools' },
    { id: 'ai-summarizer-pdf', title: 'AI Summarizer', icon: '📝', count: '220 tools' },
    { id: 'ai-pdf-chat-pdf', title: 'AI PDF Chat', icon: '💬', count: '180 tools' },
    { id: 'document-analyzer-pdf', title: 'Document Analyzer', icon: '🔎', count: '130 tools' },
    { id: 'document-generator-pdf', title: 'Document Generator', icon: '📄', count: '160 tools' },
    { id: 'create-workflow-pdf', title: 'Create Workflow', icon: '🔄', count: '110 tools' },
    { id: 'convert-pdf', title: 'Convert PDF', icon: '💱', count: '250 tools' },
    { id: 'share-pdf', title: 'Share PDF', icon: '📤', count: '170 tools' }
];
