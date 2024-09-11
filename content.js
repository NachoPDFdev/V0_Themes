let autoScrollEnabled = true;

function applyTheme(changes) {
    document.body.classList.remove('v0-light-mode', 'v0-dark-mode', 'v0-vscode-mode');
    document.body.classList.add('v0-' + changes.themeSelect + '-mode');

    const cssVars = {
        '--sent-message-color': changes.messageColor,
        '--font-weight': changes.fontWeight,
        '--font-size': `${changes.fontSize}px`,
        '--bg-color': changes.backgroundColor,
        '--sidebar-color': changes.borderColor,
        '--font-family': changes.fontSelect,
        '--user-color': changes.userColor,
        '--v0-chat-color': changes.v0ChatColor
    };

    Object.entries(cssVars).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
    });

    // Apply styles to existing messages
    document.querySelectorAll('.prose').forEach(applyMessageStyles);

    if (changes.autoScrollCheckbox !== undefined) {
        autoScrollEnabled = changes.autoScrollCheckbox;
    }
}

function applyMessageStyles(element) {
    if (element.querySelector('p')) {
        element.querySelector('p').style.color = 'var(--user-color)';
    }
    if (element.querySelector('span')) {
        element.querySelector('span').style.color = 'var(--v0-chat-color)';
    }
}

// Function to handle auto-scrolling
function autoScroll() {
    if (autoScrollEnabled) {
        window.scrollTo(0, document.body.scrollHeight);
    }
}

// Create a MutationObserver to watch for changes in the chat container
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList' || mutation.type === 'characterData') {
            autoScroll();
            document.querySelectorAll('.prose').forEach(applyMessageStyles);
        }
    });
});

// Start observing the chat container
const chatContainer = document.querySelector('#scroll-inner-container');
if (chatContainer) {
    observer.observe(chatContainer, { childList: true, subtree: true, characterData: true });
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "updateAutoScroll") {
        autoScrollEnabled = request.autoScroll;
        if (autoScrollEnabled) {
            autoScroll();
        }
    } else if (request.action === "applyTheme") {
        applyTheme(request);
    }
    sendResponse({success: true});
});

// Apply saved theme on page load
chrome.storage.sync.get(null, function(data) {
    if (Object.keys(data).length > 0) {
        applyTheme(data);
    }
});
