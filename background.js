function getTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
        if (tabs.length > 0) {
            const currentTab = tabs[0];
            const tabName = currentTab.url; // Getting focused tab's url
            const tabIcon = currentTab.favIconUrl; // Getting focused tab's icon url
            const password = "password"; // Simple authentication for custom API
            if (tabName) {
                try {
                    const response = await fetch('API_LINK', { // A custom api for managing current tab url and icon url
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ tabName, tabIcon, password }), 
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response.text();
                    console.log(data);
                    

                } catch (error) {
                    console.error('Error sending data:', error);
                }
            }
        } 
    });
}

// Set the interval to call getTab every second
setInterval(getTab, 1000);
