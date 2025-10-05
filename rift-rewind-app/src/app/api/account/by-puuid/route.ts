import { NextResponse } from 'next/server';
import {
  getRiotApiKey,
  validateApiKey,
  validateRequiredParams,
  fetchRiotApi,
} from '@/services/riot-api.service';
import { RiotAccount } from '@/types/riot.types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const puuid = searchParams.get('puuid');

  // validate required parameters
  const paramError = validateRequiredParams({ puuid }, ['puuid']);
  if (paramError) return paramError;

  // validate API key
  const apiKey = getRiotApiKey();
  const keyError = validateApiKey(apiKey);
  if (keyError) return keyError;

  // fetch from Riot API
  const { data, error } = await fetchRiotApi<RiotAccount>(
    `/riot/account/v1/accounts/by-puuid/${encodeURIComponent(puuid!)}`,
    apiKey!
  );

  if (error) return error;

  return NextResponse.json(data);
}
