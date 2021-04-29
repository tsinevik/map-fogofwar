import React from 'react';

export interface Action {
    type: ActionType;
    payload: Payload;
}

type Payload = string | LatLng | object;

export interface QuestState {
    [key: string]: Quest;
}

export interface LandmarkState {
    [key: string]: Landmark;
}

export interface Quest {
    title: string;
    address: string;
    latlng: LatLng;
    description: string;
    photoUrl: string;
    completed: boolean;
}

export interface Landmark {
    name: string;
    latlng: LatLng;
    isVisited: boolean;
    description?: string;
    photoUrl?: string;
}

export enum ActionType {
    INITIAL = 'INITIAL',
    UPDATE_FOG = 'UPDATE_FOG',
    OPEN_QUEST = 'OPEN_QUEST',
    OPEN_LANDMARK = 'OPEN_LANDMARK',
    VISIT_LANDMARK = 'VISIT_LANDMARK',
}

export type LatLng = [number, number];

export type ChildProps = { children: React.ReactNode };
