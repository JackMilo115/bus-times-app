export function parseBusTime(duration?: string) {
    if (duration) {
        const [, minutes, seconds] = duration.match(/PT(\d+)M(\d+)S/)
        return Number(seconds) + Number(minutes) * 60
    } else return 0
}