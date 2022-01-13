import {v4 as uuidv4} from 'uuid';
export class Payment {

  private readonly SEKRET = "Y3VlWnQxVXFYYTkvRU5neVNPeW9kZTJFN0JYdFQwcm5aaUNMQjYyMkZvcz0";
  private readonly KWOTA: number;
  private readonly NAZWA_USLUGI = "Zakup promowania na liscie serwerów";
  private readonly ADRES_WWW = "https://topkaminecraft.pl"
  private readonly ID_ZAMOWIENIA: string;
  private readonly EMAIL: string;
  private readonly DANE_OSOBOWE: string;


  constructor(KWOTA: number, EMAIL: string, DANE_OSOBOWE: string, id: number) {
    this.ID_ZAMOWIENIA = uuidv4() + '_' + id;
    this.KWOTA = KWOTA;
    this.EMAIL = EMAIL;
    this.DANE_OSOBOWE = DANE_OSOBOWE;
  }




  public buildUrl(){
    return "https://platnosc.hotpay.pl?SEKRET=" + this.SEKRET + "&" + "KWOTA=" + this.KWOTA + "&" + "NAZWA_USLUGI=" + this.NAZWA_USLUGI + "&"
      + "ADRES_WWW=" + this.ADRES_WWW + "&" + "ID_ZAMOWIENIA=" + this.ID_ZAMOWIENIA + "&" + "EMAIL=" + this.EMAIL + "&" + "DANE_OSOBOWE=" + this.DANE_OSOBOWE;
  }
}
