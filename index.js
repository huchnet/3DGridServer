import pathfinding from 'pathfinding';
import { Server } from "socket.io";

const dungeon_Items = {
    floor_tile_extralarge_grates: {
        name: "floor_tile_extralarge_grates",
        size: [8, 8],
        walkable: true
    },
    stairs_wall_left: {
        name: "stairs_wall_left",
        size: [5, 4],
    },

    barrier_half2: {
        name: "barrier_half2",
        size: [2, 1],
    },
    barrier_colum_half: {
        name: "barrier_colum_half",
        size: [2, 1],
    },
    stairs_narrow2: {
        name: "stairs_narrow2",
        size: [4, 4],
        type: "stair"
    },
    barrier_column2: {
        name: "barrier_column2",
        size: [4, 1],
    },

    barrier_corner: {
        name: "barrier_corner",
        size: [2, 2],
    },
    wall_archedwindow_gated: {
        name: "wall_archedwindow_gated",
        size: [4, 2],
    },
    torch_mounted5: {
        name: "torch_mounted5",
        size: [1, 1],
        walkable: true
    },
    floor_tile_small_corner: {
        name: "floor_tile_small_corner",
        size: [1, 1],
        walkable: true
    },
    floor_dirt_small_corner: {
        name: "floor_dirt_small_corner",
        size: [1, 1],
        walkable: true
    },
    floor_dirt_large_rocky: {
        name: "floor_dirt_large_rocky",
        size: [2, 2],
        walkable: true
    },
    floor_dirt_small_B: {
        name: "floor_dirt_small_B",
        size: [1, 1],
        walkable: true
    },
    floor_dirt_small_C: {
        name: "floor_dirt_small_C",
        size: [1, 1],
        walkable: true
    },
    floor_dirt_small_D: {
        name: "floor_dirt_small_D",
        size: [1, 1],
        walkable: true
    },
    floor_tile_small: {
        name: "floor_tile_small",
        size: [1, 1],
        walkable: true
    },


    floor_tile_large: {
        name: "floor_tile_large",
        size: [4, 4],
        walkable: true
    },
    wall_doorway: {
        name: "wall_doorway",
        size: [4, 2],
    },
    wall_gated: {
        name: "wall_gated",
        size: [4, 2],
    },
    wall_corner_gated: {
        name: "wall_corner_gated",
        size: [2, 2],
    },
    wall_doorway2: {
        name: "wall_doorway2",
        size: [4, 2],
    },
    wall_archedwindow_open: {
        name: "wall_archedwindow_open",
        size: [4, 2],
    },
    wall_corner5: {
        name: "wall_corner5",
        size: [2, 2],
    },
    wall_pillar: {
        name: "wall_pillar",
        size: [4, 2]
    },
    wall: {
        name: "wall",
        size: [4, 2],
    },
    wall_arched: {
        name: "wall_arched",
        size: [4, 2],
    },
    wall_cracked: {
        name: "wall_cracked",
        size: [4, 2],
    },
    stairs_walled: {
        name: "stairs_walled",
        size: [5, 5],
    }
}
const items = {

    stairs_Wood_Decorated: {
        name: "Stairs_Wood_Decorated3",
        size: [4, 6],

    },
    vela_5: {
        name: "Vela_5",
        size: [1, 1],
        walkable: true
    }, vela_6: {
        name: "Vela_6",
        size: [1, 1],
        walkable: true
    },
    vela_4: {
        name: "Vela_4",
        size: [1, 1],
        walkable: true
    },
    vela_3: {
        name: "Vela_3",
        size: [1, 1],
        walkable: true
    },
    vela_2: {
        name: "Vela_2",
        size: [1, 1],
        walkable: true
    },
    vela_1: {
        name: "Vela_1",
        size: [1, 1],
        walkable: true
    },
    bone_3: {
        name: "Bone_3",
        size: [1, 1],
        walkable: true
    },
    bone_2: {
        name: "Bone_2",
        size: [1, 1],
        walkable: true
    },
    bone_1: {
        name: "Bone_1",
        size: [1, 1],
        walkable: true
    },
    lantern: {
        name: "Lantern",
        size: [1, 1],

    },
    base_Priedra_1x1: {
        name: "Base_Priedra_1x1",
        size: [1, 1]
    },
    base_Priedra_2x2: {
        name: "Base_Priedra_2x2",
        size: [2, 2]
    },
    bench: {
        name: "Bench",
        size: [2, 1],
        walkable: true,
        stair: true,
        tall: 0.5
    },
    bench_Decorated: {
        name: "Bench_Decorated",
        size: [2, 1]
    },
    columna_Velas_2x2: {
        name: "Columna_Velas_2x2",
        size: [2, 2]
    },
    three_Yellow_3: {
        name: "Three_Yellow_3",
        size: [1, 1],
        tall: 6
    },
    three_Yellow_2: {
        name: "Three_Yellow_2",
        size: [1, 1],
        tall: 4
    },
    three_Yellow_1: {
        name: "Three_Yellow_1",
        size: [1, 1],
        tall: 2
    },
    three_Orange_3: {
        name: "Three_Orange_3",
        size: [1, 1],
        tall: 6
    },
    three_Orange_2: {
        name: "Three_Orange_2",
        size: [1, 1],
        tall: 4
    },
    three_Orange_1: {
        name: "Three_Orange_1",
        size: [1, 1],
        tall: 2
    },
    gate_Valla: {
        name: "Gate_Valla",
        size: [4, 1],
        tall: 3
    },
    gate_Valla_2: {
        name: "Gate_Valla_2",
        size: [4, 1],
        walkable: true,
        tall: 3
    },
    gate_Empty: {
        name: "Gate_Empty",
        size: [4, 1],
        walkable: true,
        tall: 3
    },
    post_Skull: {
        name: "Post_Skull",
        size: [1, 1],
        tall: 3
    },
    post_Lantern: {
        name: "Post_Lantern",
        size: [1, 1],
        tall: 3
    },
    post_Wood: {
        name: "Post_Wood",
        size: [1, 1],
        tall: 3
    },
    lapida_1: {
        name: "Lapida_1",
        size: [2, 1],
        tall: 2
    },
    lapida_2: {
        name: "Lapida_2",
        size: [2, 1],
        tall: 2
    },
    lapida_3: {
        name: "Lapida_3",
        size: [2, 1],
        tall: 2
    },
    lapida_4: {
        name: "Lapida_4",
        size: [2, 1],
        tall: 2
    },
    three_Death_3: {
        name: "Three_Death_3",
        size: [1, 1]
        ,
        tall: 6
    },
    three_Death_2: {
        name: "Three_Death_2",
        size: [1, 1],
    },
    three_Death_1: {
        name: "Three_Death_1",
        size: [1, 1],
    },
    floor_Stones_1: {
        name: "Floor_Stones_1",
        size: [2, 2],
        walkable: true
    },
    floor_Stones_2: {
        name: "Floor_Stones_2",
        size: [2, 2],
        walkable: true
    },
    floor_Stones_3: {
        name: "Floor_Stones_3",
        size: [2, 2],
        walkable: true
    },
    floor_Stones_4: {
        name: "Floor_Stones_4",
        size: [2, 2],
        walkable: true
    },
    valla_Rota: {
        name: "Valla_Rota",
        size: [4, 1],
        tall: 2
    },
    valla: {
        name: "Valla",
        size: [4, 1],
        tall: 2
    },
    valla_Piedra_Rota: {
        name: "Valla_Piedra_Rota",
        size: [4, 1],
        tall: 2
    },
    valla_Piedra: {
        name: "Valla_Piedra",
        size: [4, 1],
        tall: 2
    },
    crypt: {
        name: "Crypt",
        size: [6, 8],
        tall: 6
    },
    crypt2: {
        name: "Crypt2",
        size: [6, 8],
        tall: 6
    },
}
const floor0_floor2 = [
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [102, 104, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [104, 104, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [100, 104, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [98, 104, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [96, 104, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [94, 104, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [92, 104, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [90, 104, 0]
    },

    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [102, 104, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [104, 102, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [100, 102, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [98, 102, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [96, 102, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [94, 102, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [92, 102, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [90, 102, 0]
    },

    ///
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [104, 106, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [102, 106, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [100, 106, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [98, 106, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [96, 106, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [94, 106, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [92, 106, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [90, 106, 0]
    },

    //
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [104, 108, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [102, 108, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [100, 108, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [98, 108, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [96, 108, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [94, 108, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [92, 108, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [90, 108, 0]
    },




    //
    //

    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [102, 110, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [100, 110, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [98, 110, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [96, 110, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [94, 110, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [92, 110, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [90, 110, 0]
    },


    ///


    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [102, 112, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [100, 112, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [98, 112, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [96, 112, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [94, 112, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [92, 112, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [90, 112, 0]
    },

    //
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [102, 114, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [100, 114, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [98, 114, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [96, 114, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [94, 114, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [92, 114, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [90, 114, 0]
    },

    ////
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [110, 116, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [108, 116, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [106, 116, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [104, 116, 0]
    },

    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [102, 116, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [100, 116, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [98, 116, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [96, 116, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [94, 116, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [92, 116, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [90, 116, 0]
    },










    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [110, 104, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [112, 104, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [108, 104, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [106, 104, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [108, 102, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [106, 102, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [108, 106, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [106, 106, 0]
    },

    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [110, 106, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [110, 102, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [112, 102, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [112, 106, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [112, 108, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [112, 110, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [112, 112, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [112, 114, 0]
    },
    {
        ...dungeon_Items.floor_tile_small,
        gridPosition: [112, 116, 0]
    },





    {
        ...dungeon_Items.floor_tile_extralarge_grates,
        gridPosition: [104, 107, 0]
    },
]
const floor0 = [


    // {
    //   ...dungeon_Items.floor_tile_extralarge_grates,
    //   gridPosition: [98, 106, 0]
    // },

    {
        ...dungeon_Items.torch_mounted5,
        gridPosition: [106, 101, 0]
    },

    {
        ...dungeon_Items.torch_mounted5,
        gridPosition: [106, 101, 0],
        rotation: 4
    },

    {
        ...dungeon_Items.torch_mounted5,
        gridPosition: [97, 101, 0],
        rotation: 4
    },
    {
        ...dungeon_Items.torch_mounted5,
        gridPosition: [91, 111, 0],
        rotation: 1
    },
    {
        ...dungeon_Items.torch_mounted5,
        gridPosition: [113, 110, 0],
        rotation: 3
    },

    {
        ...dungeon_Items.wall_gated,
        gridPosition: [90, 107, 0],
        rotation: 1
    },
    {
        ...dungeon_Items.wall_gated,
        gridPosition: [113, 107, 0],
        rotation: 1
    },
    {
        ...dungeon_Items.wall_pillar,
        gridPosition: [113, 111, 0],
        rotation: 1
    },
    {
        ...dungeon_Items.wall_pillar,
        gridPosition: [90, 111, 0],
        rotation: 1
    },
    {
        ...dungeon_Items.wall_pillar,
        gridPosition: [113, 103, 0],
        rotation: 1
    },
    {
        ...dungeon_Items.wall_pillar,
        gridPosition: [90, 103, 0],
        rotation: 1
    },
    {
        ...dungeon_Items.wall_corner5,
        gridPosition: [112, 100, 0],
        rotation: 0
    },
    {
        ...dungeon_Items.wall_corner5,
        gridPosition: [90, 101, 0],
        rotation: 1
    },
    {
        ...dungeon_Items.wall_corner5,
        gridPosition: [113, 115, 0],
        rotation: 3
    },
    {
        ...dungeon_Items.wall_corner5,
        gridPosition: [91, 116, 0],
        rotation: 2
    },



    {
        ...dungeon_Items.stairs_walled,
        gridPosition: [100, 100, 0],
        type: "stair"
    },
    {
        ...dungeon_Items.wall,
        gridPosition: [100, 100, 0]
    },
    {
        ...dungeon_Items.wall_cracked,
        gridPosition: [104, 100, 0]
    },

    {
        ...dungeon_Items.wall_arched,
        gridPosition: [108, 100, 0]
    },
    {
        ...dungeon_Items.wall,
        gridPosition: [97, 100, 0]
    },
    {
        ...dungeon_Items.wall_arched,
        gridPosition: [93, 100, 0]
    },
    {
        ...dungeon_Items.wall,
        gridPosition: [97, 116, 0]
    },
    {
        ...dungeon_Items.wall_archedwindow_gated,
        gridPosition: [93, 116, 0]
    },
    {
        ...dungeon_Items.wall_archedwindow_gated,
        gridPosition: [101, 116, 0]
    },
    {
        ...dungeon_Items.wall,
        gridPosition: [105, 116, 0]
    },
    {
        ...dungeon_Items.wall_archedwindow_gated,
        gridPosition: [109, 116, 0]
    }
]
const floor1 = [
    {
        ...dungeon_Items.stairs_wall_left,
        gridPosition:
            [96, 92, 4],
        rotation: 0
    },
    {
        ...dungeon_Items.wall_arched,
        gridPosition:
            [93, 97, 4],
        rotation: 2
    },
    {
        ...dungeon_Items.wall_corner5,
        gridPosition:
            [91, 97, 4],
        rotation: 2
    },
    {
        ...dungeon_Items.barrier_half2,
        gridPosition:
            [96, 101, 4],

    }, {
        ...dungeon_Items.barrier_column2,
        gridPosition:
            [107, 101, 4],
    },

    {
        ...dungeon_Items.barrier_colum_half,
        gridPosition:
            [104, 101, 4],

    },
    {
        ...dungeon_Items.barrier_colum_half,
        gridPosition:
            [99, 100, 4],
        rotation: 2
    },
    {
        ...dungeon_Items.barrier_column2,
        gridPosition:
            [93, 101, 4],
    },

    {
        ...dungeon_Items.wall_corner5,
        gridPosition:
            [90, 94, 0],
        rotation: 1
    },
    {
        ...dungeon_Items.wall,
        gridPosition:
            [90, 96, 0],
        rotation: 1
    },
    {
        ...dungeon_Items.wall,
        gridPosition:
            [90, 100, 0],
        rotation: 1
    },
    {
        ...dungeon_Items.wall,
        gridPosition:
            [93, 93, 4],

    },
    {
        ...dungeon_Items.wall,
        gridPosition:
            [97, 93, 4],

    },
    {
        ...dungeon_Items.wall,
        gridPosition:
            [101, 93, 4],

    },
    {
        ...dungeon_Items.wall,
        gridPosition:
            [105, 93, 4],

    },
    {
        ...dungeon_Items.wall,
        gridPosition:
            [107, 93, 4],

    },
    {
        ...dungeon_Items.wall,
        gridPosition:
            [111, 93, 4],

    },
    {
        ...dungeon_Items.wall,
        gridPosition:
            [114, 93, 4],

    },
    {
        ...dungeon_Items.wall,
        gridPosition:
            [118, 96, 4],
        rotation: 1

    },
    {
        ...dungeon_Items.barrier_corner,
        gridPosition:
            [90, 100, 4],
        rotation: 2
    },
    {
        ...dungeon_Items.wall_corner5,
        gridPosition:
            [90, 94, 4],
        rotation: 1
    },
    {
        ...dungeon_Items.wall_corner5,
        gridPosition:
            [117, 93, 4],
        rotation: 4
    },
    {
        ...dungeon_Items.wall,
        gridPosition:
            [90, 96, 4],
        rotation: 1
    },


    {
        ...dungeon_Items.floor_tile_large,
        gridPosition: [115, 97, 4],
        rotation: 4
    },

    {
        ...dungeon_Items.floor_tile_large,
        gridPosition: [111, 97, 4],
        rotation: 4
    },
    {
        ...dungeon_Items.floor_tile_large,
        gridPosition: [107, 97, 4],
        rotation: 4
    },
    {
        ...dungeon_Items.floor_tile_large,
        gridPosition: [103, 97, 4],
        rotation: 4
    },
    {
        ...dungeon_Items.floor_tile_large,
        gridPosition: [99, 97, 4],
        rotation: 4
    },
    {
        ...dungeon_Items.floor_tile_large,
        gridPosition: [95, 97, 4],
        rotation: 4
    },
    {
        ...dungeon_Items.floor_tile_large,
        gridPosition: [91, 97, 4],
        rotation: 4
    },
    {
        ...dungeon_Items.floor_tile_large,
        gridPosition: [115, 93, 4],
        rotation: 4
    },
    {
        ...dungeon_Items.floor_tile_large,
        gridPosition: [111, 93, 4],
        rotation: 4
    },
    {
        ...dungeon_Items.floor_tile_large,
        gridPosition: [107, 93, 4],
        rotation: 4
    },
    {
        ...dungeon_Items.floor_tile_large,
        gridPosition: [103, 93, 4],
        rotation: 4
    },
    {
        ...dungeon_Items.floor_tile_large,
        gridPosition: [99, 93, 4],
        rotation: 4
    },
    {
        ...dungeon_Items.floor_tile_large,
        gridPosition: [95, 93, 4],
        rotation: 4
    },
    {
        ...dungeon_Items.floor_tile_large,
        gridPosition: [91, 93, 4],
        rotation: 4
    },


]

const map = {
    mapId: "level-0",
    initPosition: [0, -0.002, 0],
    size: [210, 210],
    gridDivision: 2,
    items: [

        {
            ...items.post_Lantern,
            gridPosition: [5, 1, 0]
        },
        {
            ...items.bench,
            gridPosition: [0, 4, 0],
            rotation: 1
        },
        {
            ...items.vela_1,
            gridPosition: [0, 6, 0]
        },
        {
            ...dungeon_Items.wall_pillar,
            gridPosition: [5, -6, 4]
        },
        {
            ...dungeon_Items.wall,
            gridPosition: [9, -6, 4]
        },
        {
            ...dungeon_Items.torch_mounted5,
            gridPosition: [3, -4, 4]
        },
        {
            ...dungeon_Items.torch_mounted5,
            gridPosition: [3, -1, 0]
        },
        {
            ...dungeon_Items.barrier_colum_half,
            gridPosition: [-1, -1, 4]
        },

        {
            ...dungeon_Items.barrier_column2,
            gridPosition: [2, -1, 4]
        },
        {
            ...dungeon_Items.barrier_colum_half,
            gridPosition: [6, -2, 4],
            rotation: 2
        },
        {
            ...dungeon_Items.wall,
            gridPosition: [-1, -6, 4]
        },
        {
            ...dungeon_Items.wall,
            gridPosition: [3, -6, 4]
        },
        {
            ...dungeon_Items.wall_cracked,
            gridPosition: [-2, -1, 4],
            rotation: 1
        },
        {
            ...dungeon_Items.wall,
            gridPosition: [-2, 3, 4],
            rotation: 1
        },
        {
            ...dungeon_Items.wall_archedwindow_gated,
            gridPosition: [-2, -5, 4],
            rotation: 1
        },

        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [-1, -2, 4]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [-1, -4, 4]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [-1, -6, 4]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [1, -2, 4]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [1, -4, 4]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [1, -6, 4]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [3, -2, 4]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [3, -4, 4]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [5, -2, 4]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [5, -4, 4]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [5, -6, 4]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [3, -6, 4]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [7, -2, 4]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [7, -4, 4]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [7, -6, 4]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [9, -2, 4]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [9, -4, 4]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [9, -6, 4]
        },
        {
            ...dungeon_Items.stairs_wall_left,
            gridPosition: [9, -2, 0],
            rotation: 3
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [11, -2, 4]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [11, -4, 4]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [11, -6, 4]
        },

        {
            ...dungeon_Items.wall,
            gridPosition: [-1, -2, 0]
        },
        {
            ...dungeon_Items.wall,
            gridPosition: [3, -2, 0]
        },
        {
            ...dungeon_Items.wall_arched,
            gridPosition: [-2, -1, 0],
            rotation: 1
        },
        {
            ...dungeon_Items.wall_archedwindow_gated,
            gridPosition: [-2, 3, 0],
            rotation: 1
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [-2, 0, 0]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [-2, 2, 0]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [-2, 4, 0]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [-2, 6, 0]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [0, 0, 0]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [2, 2, 0]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [2, 4, 0]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [4, 4, 0]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [6, 4, 0]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [6, 6, 0]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [4, 6, 0]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [2, 6, 0]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [4, 2, 0]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [6, 2, 0]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [0, 2, 0]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [0, 4, 0]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [0, 6, 0]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [2, 0, 0]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [4, 0, 0]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [6, 0, 0]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [8, 0, 0]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [8, 2, 0]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [8, 4, 0]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [8, 6, 0]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [10, 0, 0]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [10, 2, 0]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [10, 4, 0]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [10, 6, 0]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [12, 0, 0]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [12, 2, 0]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [12, 4, 0]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [12, 6, 0]
        },
        // {
        //     ...dungeon_Items.floor_tile_small,
        //     gridPosition: [8, 0, 0]
        // },
        ///
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [100, 100, 0]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [100, 102, 0]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [100, 104, 0]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [100, 106, 0]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [102, 100, 0]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [104, 100, 0]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [106, 100, 0]
        },
        {
            ...dungeon_Items.floor_tile_small,
            gridPosition: [108, 100, 0]
        }

        //...floor0,
        //...floor1,
        //...floor0_floor2,

    ],
    blockers: [

        {
            gridPosition: [92, 101]
        }
    ]
}

function updateStairGrid3D(nodesX, x = 8, y = 2, z = 0) {
    setNotWalkable(nodesX, [x, y + 4, z])
    setNotWalkable(nodesX, [x + 4, y + 3, z])
    setNotWalkable(nodesX, [x + 3, y + 3, z])
    setNotWalkable(nodesX, [x + 2, y + 3, z])
    setNotWalkable(nodesX, [x + 1, y + 3, z])
    setNotWalkable(nodesX, [x, y + 3, z])
    setNotWalkable(nodesX, [x + 4, y + 2, z])
    setNotWalkable(nodesX, [x + 3, y + 2, z])
    setNotWalkable(nodesX, [x + 2, y + 2, z])
    setNotWalkable(nodesX, [x + 1, y + 2, z])
    setNotWalkable(nodesX, [x, y + 2, z])
    setNotWalkable(nodesX, [x + 4, y + 1, z])
    setNotWalkable(nodesX, [x + 3, y + 1, z])
    setNotWalkable(nodesX, [x + 2, y + 1, z])
    setNotWalkable(nodesX, [x + 1, y + 1, z])
    setNotWalkable(nodesX, [x, y + 1, 0])
    createWalkablePath(nodesX, nodesX[x + 1][y + 4][z], nodesX[x + 1][y][z + 4])
    createWalkablePath(nodesX, nodesX[x + 1][y][z + 4], nodesX[x][y][z + 4])
    createWalkablePath(nodesX, nodesX[x][y][z + 4], nodesX[x][y + 4][z + 4])
    createWalkablePath(nodesX, nodesX[x + 2][y + 4][z], nodesX[x + 2][y][z + 4])
    createWalkablePath(nodesX, nodesX[x + 3][y + 4][z], nodesX[x + 3][y][z + 4])
    createWalkablePath(nodesX, nodesX[x + 3][y + 4][z], nodesX[x + 3][y][z + 4])
    createWalkablePath(nodesX, nodesX[x + 3][y][z + 4], nodesX[x + 4][y][z + 4])
    createWalkablePath(nodesX, nodesX[x + 4][y][z + 4], nodesX[x + 4][y + 4][z + 4])
    createWalkablePath(nodesX, nodesX[x][y][z + 4], nodesX[x + 4][y][z + 4])
}
function updateRectangle(nodesX) {
    createWalkablePath(nodesX, nodesX[91][99][4], nodesX[117][99][4])
    createWalkablePath(nodesX, nodesX[91][100][4], nodesX[117][100][4])



    for (let i = 0; i <= 17; i++) {
        createWalkablePath(nodesX, nodesX[100 + i][100][4], nodesX[100 + i][95][4])
    }
    for (let i = 0; i <= 17; i++) {
        createWalkablePath(nodesX, nodesX[100][95 + i][4], nodesX[117][95 + i][4])
    }

}
function create3DLayout(x, y, z) {
    let layout = new Array(x);
    for (let i = 0; i < x; i++) {
        layout[i] = new Array(y);
        for (let j = 0; j < y; j++) {
            layout[i][j] = new Array(z);
            for (let k = 0; k < z; k++) {
                layout[i][j][k] = new pathfinding.Node(i, j, k);
            }
        }
    }
    //console.log("layout " + layout.length)
    return layout;
}

function makeAllWalkableV2(layout, validLayer) {
    const result = [...layout]
    //const result = JSON.parse(JSON.stringify(layout));
    for (let i = 0; i < layout.length; i++) {
        for (let j = 0; j < layout[i].length; j++) {
            for (let k = 0; k < layout[i][j].length; k++) {

                let mInit = (i + -1 >= 0) ? -1 : 0;
                let mEnd = (i + 1 < layout.length) ? 1 : 0;

                for (let m = mInit; m <= mEnd; m++) {

                    let nInit = (j + -1 >= 0) ? -1 : 0;
                    let nEnd = (j + 1 < layout[i].length) ? 1 : 0;

                    for (let n = nInit; n <= nEnd; n++) {

                        let oInit = (k + -1 >= 0) ? -1 : 0;
                        let oEnd = (k + 1 < layout[i][j].length) ? 1 : 0;

                        for (let o = oInit; o <= oEnd; o++) {

                            let xt = m + i;
                            let yt = n + j;
                            let zt = o + k;

                            if (layout[xt][yt][zt] != layout[i][j][k] && k === validLayer && zt === validLayer) {
                                //console.log(k)
                                result[i][j][k].neighbors.push(layout[xt][yt][zt]);
                            }
                        }
                    }
                }
            }
        }
    }
    return result
}
function createAllWalkable(layout) {
    for (let i = 0; i < layout.length; i++) {
        for (let j = 0; j < layout[i].length; j++) {
            for (let k = 0; k < layout[i][j].length; k++) {

                let mInit = (i + -1 >= 0) ? -1 : 0;
                let mEnd = (i + 1 < layout.length) ? 1 : 0;

                for (let m = mInit; m <= mEnd; m++) {

                    let nInit = (j + -1 >= 0) ? -1 : 0;
                    let nEnd = (j + 1 < layout[i].length) ? 1 : 0;

                    for (let n = nInit; n <= nEnd; n++) {

                        let oInit = (k + -1 >= 0) ? -1 : 0;
                        let oEnd = (k + 1 < layout[i][j].length) ? 1 : 0;

                        for (let o = oInit; o <= oEnd; o++) {

                            let xt = m + i;
                            let yt = n + j;
                            let zt = o + k;

                            if (layout[xt][yt][zt] != layout[i][j][k]) {
                                layout[i][j][k].neighbors.push(layout[xt][yt][zt]);
                            }
                        }
                    }
                }
            }
        }
    }
}
function createWalkablePath(layout, nodeStart, nodeEnd) {
    // Create building
    let walkablelayout = create3DLayout(layout.length, layout[0].length, layout[0][0].length);

    // Create path to every corner of building
    createAllWalkable(walkablelayout);

    let startPath = walkablelayout[nodeStart.x][nodeStart.y][nodeStart.z];
    let endPath = walkablelayout[nodeEnd.x][nodeEnd.y][nodeEnd.z];

    let explorer = new pathfinding.AStarFinder();
    let exploredPath = explorer.findPath(startPath, endPath, walkablelayout);

    for (let i = 0; i < exploredPath.length - 1; i++) {
        layout[exploredPath[i][0]][exploredPath[i][1]][exploredPath[i][2]].neighbors.push(layout[exploredPath[i + 1][0]][exploredPath[i + 1][1]][exploredPath[i + 1][2]]);
        layout[exploredPath[i + 1][0]][exploredPath[i + 1][1]][exploredPath[i + 1][2]].neighbors.push(layout[exploredPath[i][0]][exploredPath[i][1]][exploredPath[i][2]]);
    }

}
function cloneGrid(nodesOrignal) {
    const newNodes = create3DLayout(map.size[0] * map.gridDivision, map.size[1] * map.gridDivision, 5);
    for (let i = 0; i < nodesOrignal.length; i++) {
        for (let j = 0; j < nodesOrignal[i].length; j++) {
            for (let k = 0; k < nodesOrignal[i][j].length; k++) {
                nodesOrignal[i][j][k].neighbors.forEach((element) => {
                    newNodes[i][j][k].neighbors.push(newNodes[element.x][element.y][element.z])
                })
            }
        }
    }
    return newNodes
}
function setNotWalkable(layout, gridPosition) {
    const targetNode = layout[gridPosition[0]][gridPosition[1]][gridPosition[2]]
    const neighbors = layout[gridPosition[0]][gridPosition[1]][gridPosition[2]].neighbors
    neighbors.forEach((nestedNode) => {
        const index = nestedNode.neighbors.indexOf(targetNode)
        if (index > -1) { // only splice array when item is found
            nestedNode.neighbors.splice(index, 1); // 2nd parameter means remove one item only
        }
    })
    layout[gridPosition[0]][gridPosition[1]][gridPosition[2]].neighbors = []
    return targetNode.x + " " + targetNode.y + " " + targetNode.z
}


const nodes = create3DLayout(map.size[0] * map.gridDivision, map.size[1] * map.gridDivision, 1);
makeAllWalkableV2(nodes, 0)
//updateStairGrid3D(nodes, 8, 2, 0)
//updateRectangle(nodes)

const io = new Server({
    cors: {
        origin: '*'
        // origin: "http://localhost:5173",
    },
});

const generateRandomPosition = (position = [90, 101, 0]) => {
    return position;

};
io.listen(3001);
const characters = [];

io.on("connection", (socket) => {
    console.log("user connected");

    characters.push({
        health: 100,
        name: socket.id.substring(0, 5),
        id: socket.id,
        orientation: 8,
        position: generateRandomPosition([5, 5, 0]),
        mapId: "level-0",
        level: 1,
        path: [],
        fly: 0
    });
    socket.emit("hello", {
        map,
        characters,
        id: socket.id
    });

    io.emit("characters", characters);


    socket.on("move3DPath", (from, to) => {//console.log(nodes[0][0][0])

        console.log("move3DPath requested")
        console.log(to)
        // if (from === to || to || from) {
        //     console.log()
        //     console.log("error " + from + " " + to)
        //     return
        // }

        const cloneNodes = cloneGrid(nodes)
        const character = characters.find(
            (character) => character.id === socket.id
        );
        const startNode = cloneNodes[from[0]][from[1]][from[2]];
        const endNode = cloneNodes[to[0]][to[1]][to[2]];
        // Find path
        const finder = new pathfinding.AStarFinder();
        const path = finder.findPath(startNode, endNode, cloneNodes);
        console.log(path)
        //console.log(cloneNodes[103][104][0])
        character.position = from;
        character.path = path;
        io.emit("playerMove", character);
        character.path = []
        character.position = to

    })
    socket.on("disconnect", () => {
        console.log("user disconnected");

        characters.splice(
            characters.findIndex((character) => character.id === socket.id),
            1
        );
        io.emit("characters", characters);
    });


});
