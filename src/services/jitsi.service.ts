@Injectable()
export class JitsiService {

  createMeetingRoom(
    doctorId: string,
    patientId: string,
    reservationId: string,
  ): { url: string; roomName: string } {

    const roomName = `consult-${reservationId.substring(0, 8)}`;
    const url = `https://meet.jit.si/${roomName}`;

    return { url, roomName };
  }

  // Pas de suppression nécessaire — les rooms Jitsi sont éphémères
  deleteMeetingRoom(_roomName: string): void {
    return;
  }
}
