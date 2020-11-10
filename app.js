

class DrumKit {

    constructor() {
        this.pads = document.querySelectorAll('.pad');
        this.playButton = document.querySelector('.play');
        this.currentKick = './sounds/kick-classic.wav';
        this.currentSnare = './sounds/snare-accoustic01.wav';
        this.currentHihat = './sounds/hihat-accoustic01.wav';
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.index = 0;
        this.bpm = 120;
        this.isPlaying = null;
        this.selects = document.querySelectorAll('select');
        this.muteButtons = document.querySelectorAll('.mute');
        this.tempoSlider = document.querySelector('.tempo-slider');
    }

    repeat() {
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`)
        // Loop over the pads
        activeBars.forEach((bar) => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
            //Check if pads are active | Which type of pad is active?
            if(bar.classList.contains('active')) {
                if(bar.classList.contains('kick-pad')) {
                    this.kickAudio.currentTime = '0';
                    this.kickAudio.play();
                }
                if(bar.classList.contains('snare-pad')) {
                    this.snareAudio.currentTime = '0';
                    this.snareAudio.play();
                }
                if(bar.classList.contains('hihat-pad')) {
                    this.hihatAudio.currentTime = '0';
                    this.hihatAudio.play();
                }
            }
        })
        this.index++;
    }

    start() {

        const interval = (60/this.bpm) * 1000;
        // Check if it's playing
        if (!this.isPlaying) {
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval);
        } else {
            // Clear the interval
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }
        
    }

    updateButton() {
        if(!this.isPlaying) {
            this.playButton.innerText = 'Stop';
            this.playButton.classList.add('active');
        } else {
            this.playButton.innerText = 'Play';
            this.playButton.classList.remove('active');
        }
    }

    mute(e) {
        //This is where the mute button would go
    }

    changeTempo(e) {
        const tempoText = document.querySelector('.tempo-number');
        this.bpm = e.target.value;
        tempoText.innerText = e.target.value;
    }

    updateTempo() {
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        const playbtn = document.querySelector('.play');
        if (playbtn.classList.contains('active')) {
            this.start();
        }
    }

    changeSound(e) {
        const selectionName = e.target.name;
        const selectionValue = e.target.value;

        // Switch statement to change sounds
        switch(selectionName) {
            case 'kick-select':
                this.kickAudio.src = selectionValue;
                break;
            case 'snare-select':
                this.snareAudio.src = selectionValue;
                break;
            case 'hihat-select':
                this.hihatAudio.src = selectionValue;
                break;
        }
    }

    mute(e) {
        console.log(e);
    }

    activePad() {
        this.classList.toggle('active');
    }

}

// Creating a new instance of the class above
const drumKit = new DrumKit();


// Event listeners 
drumKit.pads.forEach((pad) => {
    pad.addEventListener('click', drumKit.activePad);
    pad.addEventListener('animationend', function() {
        this.style.animation = '';
    })
})

drumKit.playButton.addEventListener('click', function() {
    drumKit.updateButton();
    drumKit.start();
})

drumKit.selects.forEach(select => {
    select.addEventListener('change', function(e) {
        drumKit.changeSound(e);
    })
})

drumKit.muteButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        drumKit.mute(e);
    })
})

// The reason we are using the 'input' and not the "change" event is because we are just using it
// to change the text of the slider.
drumKit.tempoSlider.addEventListener('input', function(e) {
    drumKit.changeTempo(e);
})

// Every time we move the slider, we pause the music
drumKit.tempoSlider.addEventListener('change', function(e) {
    drumKit.updateTempo(e);
})
