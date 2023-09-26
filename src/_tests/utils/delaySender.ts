import ByteStream from '../../reader/ByteStream';

export const delaySender = (stream: ByteStream, messages: string[], interval: number = 5) => {
    let index = 0;
    for (const msg of messages) {
        for (const chr of msg.split('')) {
            setTimeout(() => {
                stream.addMessage(chr);
            }, index++ * interval);
        }
    }
};