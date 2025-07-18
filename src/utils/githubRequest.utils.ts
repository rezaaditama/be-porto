import dotenv from 'dotenv';
dotenv.config();

export const githubRequest = async <T = unknown>(url: string): Promise<T> => {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    throw new Error('GITHUB_TOKEN tidak ditemukan di .env');
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
    },
  });
  if (!response.ok)
    throw new Error(`Fetching GitHub Gagal : ${response.statusText}`);

  return response.json();
};
