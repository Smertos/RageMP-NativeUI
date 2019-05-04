export class Common {
	static playSound(audioName: string, audioRef: string) {
		mp.game.audio.playSound(-1, audioName, audioRef, false, 0, true);
	}
}
