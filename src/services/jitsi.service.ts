import { Injectable } from '@nestjs/common';

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

  deleteMeetingRoom(_roomName: string): void {
    // Jitsi gère ça automatiquement
  }
}
