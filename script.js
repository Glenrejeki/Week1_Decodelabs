document.addEventListener('DOMContentLoaded', () => {
    const copyBtn = document.getElementById('copy-btn');
    const shareBtn = document.getElementById('share-btn');
    const toast = document.getElementById('toast');

    // Function to show toast notification
    const showToast = (message) => {
        toast.textContent = message;
        toast.classList.remove('hidden');
        
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    };

    // Copy to Clipboard Feature
    copyBtn.addEventListener('click', async () => {
        const url = window.location.href;
        
        try {
            await navigator.clipboard.writeText(url);
            showToast('Link copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                showToast('Link copied to clipboard!');
            } catch (fallbackErr) {
                showToast('Failed to copy link.');
            }
            document.body.removeChild(textArea);
        }
    });

    // Web Share API Feature
    shareBtn.addEventListener('click', async () => {
        const shareData = {
            title: 'DecodeLabs Intern | Link-in-Bio',
            text: 'Check out my professional links and portfolio!',
            url: window.location.href
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
                console.log('Shared successfully');
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Fallback if Web Share API is not supported (e.g., on Desktop Chrome/Firefox)
            showToast('Sharing not supported on this browser. Use Copy Link instead!');
        }
    });
});