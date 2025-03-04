// User theme configuration
export interface UserTheme {
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  textColor: string;
  backgroundColor: string;
  accentColor?: string;
  fontFamily?: string;
  logoPosition?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "center";

  // Additional theme properties can be added as needed
  customProperties?: Record<string, string>;
}
