# Introduction
After the mid-term, I wanted to do something a bit more interesting than the basic *Pitfall* like game we started on. The lecture on sound triggered an old memory, and I decided to change my project up and implement a Moon Patrol clone. I replaced the character with the Moon Patrol ATB, trees became rock formations, clouds became moons and planets, and I hoped to add some flair to the mountains by adding a particle emitter and making it look like a volcano. The pick-ups are dropped by shooting the enemies and randomly spawned in the levels, based on the levelDesign specification.

# Code Design
I implemented almost everything as ECMA2015 classes. Wherever possible, I extracted common functionality into static methods or helper classes.

# Additions
I've added sound (from a royalty-free library that I downloaded - citations needed?), enemies, a shield for the player, and some particle effects for explosions. I had hoped to add homing missiles, but ran out of time to implement the targeting logic and the ability to rotate the particle emitter to align to the direction of the missile.

# Enemies
There are 4 types of enemies:
 - Standard fighter
 - Bomber (has 5 health. A counter displays the remaining health when you start hitting it)
 - Scout (plays a sound to warn the player that it's coming)
 - Mothership (has 20 health. A counter displays the remaining health when you start hitting it. plays a sound to warn the player that it's coming)
 - All enemies drops power-ups (with different probabilities)
   - Standard (10%)
   - Scout (100%)
   - Bomber (20%)
   - Mothership (100%)

# Level Design
 The level starts and finishes at a base. I implemented a data object to contain the level design information, so that additional levels can be created quickly.

# Game Mechanics
 - Key Mapping:
        LeftCtrl    - Fire1
        Z:          - Fire2
        LeftArrow:  - Slow
        RightArrow: - Accelerate
        Spacebar:   - Jump
        S:          - Shield
        M:          - Toggle music
        ENTER:      - Accept
        ESC:        - Cancel
        F1:         - Show Help Menu

The background scrolls at a minimum speed, and will speed up or slow down with the player. The wheels on the ATB bounce with the terrain (really it's just a random movement, loosely synced to the speed of the ATB). I added a shield mechanic, the shield counter is decreased when the shield is hit, by a damage factor for each different UFO / Bomb type.

 # Citations
  - The Original Moon Patrol
  - Fonts
    - https://www.fontspace.com/category/sci-fi
      - Moonhouse (100% Free)
  - Sound Effects
    - All the sounds are from GDC (2016 - 2019) Free Sound Libraries that were issued post the event

# Improvements
I would have loved to implement the missiles, as well as for the bomber and mother ship bullets to create craters on impact. 
The mothership logic is also a bit generic, and I would have liked to make it come into the scene from the right hand side and 
dart at the player to drop bombs. I had also intended to implement a beam weapon for the mothership, that would burn the ground. 
Some more opportunity for particles. The code is in a reasonable state, but there are still many places where further cleaning and
extraction of common elements to methods and helpers would be appropriate. Again, I just ran out of time for some of that.

# Summary
Overall, I am happy with what I was able to achieve, especially since it is my first *complete* game.
