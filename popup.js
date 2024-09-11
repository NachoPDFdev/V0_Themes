document.addEventListener('DOMContentLoaded', function() {
    const controls = [
        'themeSelect', 'messageColor', 'fontWeight', 'fontSize', 'backgroundColor',
        'borderColor', 'fontSelect', 'userColor', 'v0ChatColor', 'autoScrollCheckbox'
    ];

    const elements = {};
    controls.forEach(id => {
        elements[id] = document.getElementById(id);
        if (id !== 'autoScrollCheckbox') {
            elements[id].addEventListener('change', updateTheme);
        }
    });

    // Load saved settings
    chrome.storage.sync.get(null, function(data) {
        Object.keys(data).forEach(key => {
            if (elements[key]) {
                if (key === 'autoScrollCheckbox') {
                    elements[key].checked = data[key];
                } else {
                    elements[key].value = data[key];
                }
            }
        });
    });

    // Auto-scroll checkbox handler
    elements.autoScrollCheckbox.addEventListener('change', function() {
        const autoScroll = this.checked;
        chrome.storage.sync.set({autoScrollCheckbox: autoScroll});
        
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "updateAutoScroll",
                autoScroll: autoScroll
            });
        });
    });

    function updateTheme() {
        const changes = {};
        controls.forEach(id => {
            if (id === 'autoScrollCheckbox') {
                changes[id] = elements[id].checked;
            } else {
                changes[id] = elements[id].value;
            }
        });

        chrome.storage.sync.set(changes);

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "applyTheme",
                ...changes
            });
        });
    }
});