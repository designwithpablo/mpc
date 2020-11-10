

class DrumKit {

    constructor() {
        this.pads = document.querySelectorAll('.pad');
        this.playButton = document.querySelector('.play');
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.index = 0;
        this.bpm = 120;
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

        setInterval(() => {
            this.repeat();
        }, interval);
    }

    activePad() {
        this.classList.toggle('active');
    }

}

//Creating a new instance of the class above
const drumKit = new DrumKit();

drumKit.pads.forEach((pad) => {
    pad.addEventListener('click', drumKit.activePad);
    pad.addEventListener('animationend', function() {
        this.style.animation = '';
    })
})

drumKit.playButton.addEventListener('click', function() {
    drumKit.start();
})