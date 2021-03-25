/* eslint-disable import/no-anonymous-default-export */
export default [
    {

        modelid: 1,
        training_percent: 10,
        validation_percent: 40,
        epochs: 4,
        padding: 2,
        depth: 11,
        pooling_type: 'none',
        kernel_size: 3,
        stride: 2,
        training_status: 'In progress',
        training_accuracy: 80,
        Validation_accuracy: 90,
        f1_score: 0.8,
        precision: 0.7,
        recall: 0.9,
        epoch_accuracy: [90, 92, 93, 95]

    },
    {
        id: 1,
        createdAt: '31/03/2019',
        imageSrc: '/images/1.png',
        title: 'Speed Limit 60',
        totalImages: '625'
    },
    {
        id: 2,
        createdAt: '03/04/2019',
        imageSrc: '/images/2.png',
        title: 'Stop!',
        totalImages: '857'
    },
    {
        id: 3,
        createdAt: '04/04/2019',
        imageSrc: '/images/3.png',
        title: 'Slippery road',
        totalImages: '406'
    },
    {
        id: 4,
        createdAt: '04/04/2019',
        imageSrc: '/images/4.png',
        title: 'Right turn',
        totalImages: '835'
    }
];
