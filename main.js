(function() {
    let setupForm = document.getElementById('setup')
    let playForm = document.getElementById('play')

    let phrase, guesses = {}

    setupForm.addEventListener('submit', function(e) {
        e.preventDefault()
        let formData = new FormData(e.target)
        let _phrase = formData.get('phrase')
        if (_phrase) {
            phrase = _phrase
            buildPhraseDisplay()
            toggleForms()
        }
    })

    playForm.addEventListener('submit', function(e) {
        e.preventDefault()
        let formData = new FormData(e.target)
        let guess = formData.get('guess').toLowerCase()
        if (guess && guess.length === 1) {
            if (phrase.toLowerCase().includes(guess)) {
                guesses[guess] = true
                buildPhraseDisplay()
            } else {
                guesses[guess] = false
                buildIncorrectDisplay()
            }
            e.target.reset()
        }
    })

    function toggleForms() {
        if (setupForm.getAttribute('hidden') === 'true') {
            setupForm.hidden = false
            playForm.hidden = true
        } else {
            setupForm.hidden = true
            playForm.hidden = false
        }
    }

    function buildPhraseDisplay() {
        let string = ''
        let isComplete = true
        for (let i = 0; i < phrase.length; i++) {
            let current = phrase[i]
            if (current === ' ' || guesses[current.toLowerCase()]) {
                string += current
            } else {
                string += '_'
                isComplete = false
            }
        }
        document.getElementById('phrase_display').textContent = string
        return isComplete
    }

    function buildIncorrectDisplay() {
        let incorrect = []
        for (let guess in guesses) {
            if (guesses[guess] === false) {
                incorrect.push(guess)
            }
        }
        document.getElementById('incorrect_display').textContent = incorrect.join(' ')
    }
})()