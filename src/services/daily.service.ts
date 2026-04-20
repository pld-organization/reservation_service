import { Injectable } from '@nestjs/common';
import axios from 'axios';

interface DailyRoom {
  name: string;
  url: string;
  api_created: boolean;
}

@Injectable()
export class DailyService {
  private readonly apiKey = process.env.DAILY_API_KEY;
  private readonly baseUrl = 'https://api.daily.co/v1';

  async createMeetingRoom(
    doctorId: string,
    patientId: string,
    reservationId: string,
  ): Promise<{ url: string; roomName: string }> {
    if (!this.apiKey) {
      throw new Error('DAILY_API_KEY is not configured');
    }

    // Créer un nom de room unique basé sur les IDs
    const roomName = `room-${reservationId.substring(0, 8)}`;

    try {
      const response = await axios.post<DailyRoom>(
        `${this.baseUrl}/rooms`,
        {
          name: roomName,
          properties: {
            enable_knocking: true,
            enable_screenshare: true,
            enable_chat: true,
            max_participants: 10,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('[Daily.co] Room created:', {
        roomName: response.data.name,
        url: response.data.url,
      });

      return {
        url: response.data.url,
        roomName: response.data.name,
      };
    } catch (error) {
      console.error('[Daily.co] Error creating room:', error);
      throw new Error(`Failed to create Daily.co meeting: ${error.message}`);
    }
  }

  async deleteMeetingRoom(roomName: string): Promise<void> {
    if (!this.apiKey) {
      throw new Error('DAILY_API_KEY is not configured');
    }

    try {
      await axios.delete(`${this.baseUrl}/rooms/${roomName}`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      });

      console.log('[Daily.co] Room deleted:', roomName);
    } catch (error) {
      console.error('[Daily.co] Error deleting room:', error);
      throw new Error(`Failed to delete Daily.co meeting: ${error.message}`);
    }
  }
}
