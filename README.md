# Simon-Says

![Simon Says Screenshot](/assets/simon_ss.png)

## Description  

A browser-based game of Simon Says. 

### Technologies

- HTML
- CSS
- JavaScript

### Installation instructions

Fork the repo and clone it down to your machine, then host on a live server!

### User Stories

#### MVP

- As a user, I want a browser-based graphical interface so that I can play the game.
- As a user, I want the four quadrants to have different colors that light up.
- As a user, I want the sequence to increase in length until I repeat the sequence incorrectly.
- As a user, I want to be notified that the game is over if I enter the incorrect sequence.
- As a user, I want the game to have a restart button.

#### Stretch Goals

- As a user, I want the game to have sound cues for the four quadrants.
- As a user, I want to see the current round number as well as the highest round I have ever reached.

- As a user, I want different visual themes.
- As a user, I want different game modes.

  - Mirrored/Reverse recall
  - Only repeat what Simon actually "says"

### Wire Frames

![Simon Says Wireframe](/assets/wire-frame.png)

### Major Hurdles

- Figuring out how to have multiple audio sources playing at once was my biggest hurdle, it turns out there are lots of ways to solve the problem but to do it with just JavaScript involves preloading multiple virtual channels for each audio sample that you can pull from as needed.
- While I was able to figure it out, it took quite a while so I unfortunately did not get to implement a few different visual themes as I may have liked.

### Unsolved Problems

- Audio files are experiencing some odd distortion, the files sound perfect when played directly from the file on my machine, but something odd is
  happening when they try to play through the browser, fix might be as simple as choosing different audio files.
- Some unwanted behavior if the player clicks the reset button too quickly or during a long Simon turn since my Simon function relies on queued and staggered setTimeouts. Was exploring the clearTimeout function but could not quite get the functionality I wanted.
