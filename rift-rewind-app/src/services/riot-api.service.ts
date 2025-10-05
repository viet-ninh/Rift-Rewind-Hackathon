import { NextResponse } from 'next/server';

export const RIOT_API_BASE_URL = 'https://americas.api.riotgames.com';

export interface RiotApiError {
  error: string;
  details?: string;
}

// gets the Riot API key from environment variables
export function getRiotApiKey(): string | undefined {
  return process.env.RIOT_API_KEY;
}

// creates headers for Riot API requests
export function createRiotHeaders(apiKey: string): HeadersInit {
  return {
    'X-Riot-Token': apiKey,
  };
}

// validates that the API key is configured
export function validateApiKey(apiKey: string | undefined): NextResponse<RiotApiError> | null {
  if (!apiKey) {
    return NextResponse.json(
      { error: 'RIOT_API_KEY not configured' },
      { status: 500 }
    );
  }
  return null;
}

// makes a request to the Riot API
export async function fetchRiotApi<T>(
  endpoint: string,
  apiKey: string
): Promise<{ data?: T; error?: NextResponse<RiotApiError> }> {
  try {
    const response = await fetch(`${RIOT_API_BASE_URL}${endpoint}`, {
      headers: createRiotHeaders(apiKey),
      next: { revalidate: 300 }, // cache for 5 minutes
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        error: NextResponse.json(
          { error: 'Riot API error', details: errorText },
          { status: response.status }
        ),
      };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    return {
      error: NextResponse.json(
        { error: 'Failed to fetch from Riot API', details: String(error) },
        { status: 500 }
      ),
    };
  }
}

// validates required query parameters
export function validateRequiredParams(
  params: Record<string, string | null>,
  required: string[]
): NextResponse<RiotApiError> | null {
  const missing = required.filter((param) => !params[param]);

  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required parameters: ${missing.join(', ')}` },
      { status: 400 }
    );
  }

  return null;
}
