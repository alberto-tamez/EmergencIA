export interface CallDetailsArgs {
  name: string;
  phone: string;
  time_called: Date;
  time_ended: Date;
  call_transcription: string;
  emotion_name: string;
  emotion_score: number;
  caller_risk: number;
  assessment_time: Date;
  situation_type: string;
  recommended_action: string;
  caller_situation: string;
  threat_timestamp: Date;
  caller_location: string;
}

export interface CallDetails {
  user: Users;
  call: Calls;
  transcription: Transcriptions;
  emotion: Emotion_Details;
  assessment: Threat_Assessment;
}

export interface Users {
  userID: number;
  name: string;
  phone: string;
}

export interface Calls {
  callID: number;
  userID: number;
  time_called: Date;
  time_ended: Date;
  caller_location: string;
}

export interface Transcriptions {
  transcriptionID: number;
  callID: number;
  call_transcription: string;
}

export interface Emotion_Details {
  detailID: number;
  callID: number;
  emotion_name: string;
  emotion_score: number;
}

export interface Threat_Assessment {
  assessmentID: number;
  callID: number;
  caller_risk: number;
  assessment_time: Date;
  situation_type: string;
  recommended_action: string;
  caller_situation: string;
  threat_timestamp: Date;
}
