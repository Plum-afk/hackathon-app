
export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

export interface Veterinarian {
  id: number;
  name: string;
  phone: string;
  address: string;
}
