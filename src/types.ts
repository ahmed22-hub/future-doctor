export interface WorkflowStep {
  number: string;
  iconName: string;
  title: string;
  desc: string;
  detail: string;
  metric: string;
  actor: string;
}

export interface RobotFeature {
  id: string;
  iconName: string;
  title: string;
  tagline: string;
  description: string;
  spec: string;
}

export interface AdvantageItem {
  id: string;
  iconName: string;
  title: string;
  shortDesc: string;
  metricValue: string;
  metricUnit: string;
}

export interface EthicsPoint {
  id: string;
  iconName: string;
  title: string;
  desc: string;
  challenge: string;
}
