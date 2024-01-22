"use client";
import React from 'react';
import styles from './page.module.css';
import { ApiHealthCheckAsyncOperations } from '@/data';
import { components } from '@/presentation';
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Skeleton } from '@mui/material';
import { HealthChecks, Region } from '@/util';
import { useRouter, useSearchParams } from 'next/navigation';
import GitHub from '@mui/icons-material/GitHub';
import { Box, Container, Link, Typography } from '@mui/material';

const queryClient = new QueryClient();
const operations = new ApiHealthCheckAsyncOperations();

const LOGO_URL = process.env.LOGO ?? 'https://movementlabs.xyz/wp-content/themes/movement-labs/assets/images/logo.svg';
const TITLE = process.env.TITLE ?? 'Health Checks';
const REGION = (process.env.REGION ?? 'Global') as Region;
const DISCORD_URL = process.env.DISCORD_URL ?? 'https://discord.gg/...';
const ATLASSIAN_URL = process.env.ATLASSIAN_URL;
const GITHUB_URL = process.env.GITHUB_URL;

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}

function Home() {

  const router = useRouter();
  const params = useSearchParams();
  const page = parseInt(params?.get('page') || '1') - 1;

  const healthCheckQuery = async () => {
    return await operations.getHealthCheckPage(page);
  };

  const { isLoading, error, data: healthChecks } = useQuery({
    queryKey: ['healthChecks', page],
    queryFn: healthCheckQuery,
    staleTime: 10000,
  });

  const handlePageChange = (newPage : number) => {
    router.push(`/?page=${newPage}`, undefined);
  };

  return (
    <div className={styles.container}>
      <components.HeaderStd
        logoUrl={LOGO_URL}
        status={
          error ? 'error' : isLoading ? 'warning' : 'success'
        }
        title={TITLE}
        region={REGION}
        contactOptions={{
          discord : DISCORD_URL,
          atlassian : ATLASSIAN_URL,
          github : GITHUB_URL,
        }}
      />
      <main className={styles.main}>
        {isLoading ? (
          <>
            <Skeleton variant="rectangular" width="100%" height={118} />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
          </>
        ) : error ? (
          <span>Error: {error.message}</span>
        ) : (
          <section style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            width: '100%',
          }}>
            {healthChecks && healthChecks.healthCheckGroups.map((group) => (
              <components.HealthCheckGroupStd 
                  key={group[0].group}
                  group={group[0].group}
                  healthChecks={group} />
              ))}
          </section>
        )}
        <br/>
        <Container sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
        }}>
          <components.PageSelector
            onPageChange={handlePageChange}
            totalPages={healthChecks?.totalPages || 0}
            currentPage={page + 1}/>
        </Container>
      </main>
      <footer className={styles.footer}>
      <Container maxWidth="lg">
        <Box sx={{ py: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="body2" color="textSecondary" align="center">
            © 2024 MovementLabs
          </Typography>
          <br/>
          <Link href="https://github.com/movemntdev/log-status" color="inherit" target="_blank">
            <GitHub />
          </Link>
        </Box>
      </Container>
    </footer>
    </div>
  );
}

