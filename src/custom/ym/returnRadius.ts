const returnRadius = (value: number) => {
    switch (value) {
        case 19:
            return 100;
        case 18:
            return 200;
        case 17:
            return 300;
        case 16:
            return 500;
        // case 15:
        //     return 1000;
        default:
            return 300;
    }
}

export default returnRadius;