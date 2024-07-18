type PushifyOptions = {
  key: string;
  baseURL?: string;
  userAgent?: string;
};

type SendMessageData = {
  title: string;
  body?: string;
  url?: string;
  data?: Record<string, string>;
} & ({ channel: string } | { channels: string[] });

export function getError(error: any) {
  console.log(error);
  if (error?.response?.status == 429) {
    return 'Too many requests. Please try again later.';
  }
  return (
    error?.response?.data?.error ||
    error?.message ||
    error?.error ||
    error ||
    'An unknown error occurred.'
  );
}

export class Pushify {
  private readonly headers: Headers;

  private readonly baseURL: string;

  constructor(readonly options: PushifyOptions) {
    if (!options.key) {
      throw new Error('You must provide a key to use Pushify');
    }

    this.baseURL = options.baseURL || 'https://api.pushify.net/v1';

    this.headers = new Headers({
      Authorization: `Bearer ${options.key}`,
      'Content-Type': 'application/json',
      'User-Agent':
        options.userAgent ||
        `pushify-node/${require('../package.json').version}`,
    });
  }

  async send(data: SendMessageData) {
    return new Promise(async (resolve, reject) => {
      await fetch(`${this.baseURL}/send`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          ...data,
        }),
      })
        .then((res) => {
          if (res.ok) {
            resolve(res.json());
          } else {
            reject(res.json());
          }
        })
        .catch((error) => {
          reject(getError(error));
        });
    });
  }
}
