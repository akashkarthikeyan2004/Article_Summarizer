document.getElementById('summarizeBtn').addEventListener('click', async () => {
    const url = document.getElementById('url').value;
    const resultDiv = document.getElementById('result');

    if (!url) {
        resultDiv.innerHTML = 'Please enter a valid URL.';
        return; 
    }

    resultDiv.innerHTML = 'Summarizing...';

    try {
        const response = await fetch(`https://article-extractor-and-summarizer.p.rapidapi.com/summarize?url=${encodeURIComponent(url)}&lang=en&engine=2`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'a89bbad1d5msh7a4070d4df7e376p15dfcbjsn53432c96eacb',
                'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com'
            }
        });

        const data = await response.json();

        if (data.summary) {
            const summaryPoints = data.summary.split('.').filter(point => point.trim() !== '').map(point => `<li>${point.trim()}</li>`).join('');
            resultDiv.innerHTML = `<h2>Summary:</h2><ul>${summaryPoints}</ul>`;
        } else {
            resultDiv.innerHTML = 'Could not summarize the article.';
        }
    } catch (error) {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while summarizing the article.';
    }
});
