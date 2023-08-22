export interface UserInterface {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    suite: string
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  id: number;
}