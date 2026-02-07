export interface BaseTemplateLayoutProps {
  introComponent?: React.FC;
  outroComponent?: React.FC<{ doesAccountHaveSponsors: boolean }>;
  backgroundComponent: React.FC;
  customAudioComponent: React.FC;
  mainComponentLayout?: React.FC;
}
