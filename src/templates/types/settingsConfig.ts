export interface UIConfig {
  fonts: Fonts;
  colors: Colors;
  componentStyles: ComponentStyles;
  layout: Layout;
  animation: Animation;
  media: Media;
}

export interface Fonts {
  title: { family: string };
  copy: { family: string };
}

export interface Colors {
  primary: string;
  secondary: string;
  text: {
    dark: string;
    light: string;
  };
  background: {
    light: string;
    dark: string;
  };
  accent: string;
  utility: {
    success: string;
    warning: string;
    error: string;
  };
}

export interface ComponentStyles {
  title: Style;
  subtitle: Style;
  bodyText: Style;
  playerName: Style;
  score: Style;
  teamName: Style;
  label: Style;
  ladderGradeLabel: Style;
  ladderTeamName: Style;
  ladderTeamPoints: Style;
  Top5PlayerName: Style;
  Top5PlayerTeam: Style;
  Top5PlayerScore: Style;
  Top5PlayerScoreSuffix: Style;
  ResultScore: Style;
  ResultScoreYetToBat: Style;
  ResultTeamName: Style;
  ResultPlayerName: Style;
  ResultPlayerScore: Style;
  ResultSyntax: Style;
  ResultFixtureResult: Style;
  ResultMetaData: Style;
  RosterPlayerName: Style;
  metadataSmall: Style;
  metadataMedium: Style;
  metadataLarge: Style;
}

export interface Style {
  className: string;
}

export interface Layout {
  heights: {
    asset: number;
    header: number;
    footer: number;
  };
  spacing: {
    section: string;
    item: string;
  };
  padding: {
    container: string;
    section: string;
    item: string;
  };
}

export interface Animation {
  duration: {
    fast: number;
    normal: number;
    slow: number;
  };
  easing: {
    ease: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
  };
}

export interface Media {
  aspectRatios: {
    portrait: number;
    square: number;
    landscape: number;
  };
  borderRadius: {
    small: string;
    medium: string;
    large: string;
    full: string;
  };
}
