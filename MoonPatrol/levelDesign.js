const levelDesigns = [
    {
        floorHeight: 0.3,
        startX: 250,
        width: 4,
        bgColor: { r: 105, g: 105, b: 105 },
        skyColor: { r: 25, g: 25, b: 112 },
        planets: [
            { x: 400, y: 200, color: { r: 238, g: 130, b: 238 }, accentColor: { r: 186, g: 85, b: 211 }, diameter: 280 },
            { x: 1000, y: 250, color: { r: 175, g: 238, b: 238 }, accentColor: { r: 95, g: 158, b: 160 }, diameter: 160 },
        ],
        rocks: 8,
        mountains: { qty: 5, type: MOUNTAIN_TYPE_SNOW, },
        craters: 5,
        bases: [
            { x: 0, type: BASE_ORIENTATION_LEFT, color: { r: 32, g: 178, b: 170 }, accentColor: { r: 255, g: 99, b: 71 } },
            { x: -1, type: BASE_ORIENTATION_RIGHT, color: { r: 32, g: 178, b: 170 }, accentColor: { r: 255, g: 99, b: 71 } },
        ],
        enemies: [
            { type: UFO_STANDARD, count: 3, waves: 4, speedFactor: 1, },
            { type: UFO_SCOUT, count: 1, waves: 3, speedFactor: 1, },
            { type: UFO_BOMBER, count: 1, waves: 1, speedFactor: 1, },
        ],
        pickups: [
            { x: -1, type: -1, dropChance: 50, count: 4, },
        ],
    },
    {
        floorHeight: 0.3,
        startX: 250,
        width: 8,
        bgColor: { r: 160, g: 82, b: 45 },
        skyColor: { r: 47, g: 79, b: 79 },
        planets: [
            { x: 400, y: 200, color: { r: 175, g: 238, b: 238 }, accentColor: { r: 186, g: 85, b: 211 }, diameter: 280 },
            { x: 1000, y: 250, color: { r: 238, g: 130, b: 238 }, accentColor: { r: 95, g: 158, b: 160 }, diameter: 160 },
        ],
        rocks: 15,
        mountains: { qty: 5, type: MOUNTAIN_TYPE_SNOW, },
        craters: 12,
        bases: [
            { x: 0, type: BASE_ORIENTATION_LEFT, color: { r: 255, g: 99, b: 71 }, accentColor: { r: 32, g: 178, b: 170 } },
            { x: -1, type: BASE_ORIENTATION_RIGHT, color: { r: 255, g: 99, b: 71 }, accentColor: { r: 32, g: 178, b: 170 } },
        ],
        enemies: [
            { type: UFO_STANDARD, count: 3, waves: 10, speedFactor: 1.2, },
            { type: UFO_SCOUT, count: 1, waves: 5, speedFactor: 1.2, },
            { type: UFO_BOMBER, count: 1, waves: 3, speedFactor: 1.2, },
            { type: UFO_BOSS, count: 1, waves: 1, speedFactor: 1.2, },
        ],
        pickups: [
            { x: -1, type: -1, dropChance: 100, count: 2, },
        ],
    },
    {
        floorHeight: 0.3,
        startX: 250,
        width: 12,
        bgColor: { r: 60, g: 179, b: 113 },
        skyColor: { r: 139, g: 0, b: 139 },
        planets: [
            { x: 400, y: 200, color: { r: 25, g: 25, b: 112 }, accentColor: { r: 70, g: 130, b: 180 }, diameter: 280 },
            { x: 1000, y: 250, color: { r: 128, g: 0, b: 0 }, accentColor: { r: 218, g: 165, b: 32 }, diameter: 160 },
        ],
        rocks: 20,
        mountains: { qty: 5, type: MOUNTAIN_TYPE_SNOW, },
        craters: 16,
        bases: [
            { x: 0, type: BASE_ORIENTATION_LEFT, color: { r: 32, g: 178, b: 170 }, accentColor: { r: 255, g: 99, b: 71 } },
            { x: -1, type: BASE_ORIENTATION_RIGHT, color: { r: 32, g: 178, b: 170 }, accentColor: { r: 255, g: 99, b: 71 } },
        ],
        enemies: [
            { type: UFO_STANDARD, count: 4, waves: 16, speedFactor: 1.5, },
            { type: UFO_SCOUT, count: 1, waves: 10, speedFactor: 1.5, },
            { type: UFO_BOMBER, count: 2, waves: 5, speedFactor: 1.5, },
            { type: UFO_BOSS, count: 1, waves: 2, speedFactor: 1.5, },
        ],
        pickups: [
            { x: -1, type: -1, dropChance: 75, count: 6, },
        ],
    },
];