"use client";
import React from 'react';
import styles from './page.module.css';
import { ApiHealthCheckAsyncOperations } from '@/data';
import { components } from '@/presentation';
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Skeleton } from '@mui/material';
import { HealthChecks } from '@/util';
import { useRouter, useSearchParams } from 'next/navigation';

const queryClient = new QueryClient();
const operations = new ApiHealthCheckAsyncOperations();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}

export function Home() {

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
        logoUrl="https://movementlabs.xyz/wp-content/themes/movement-labs/assets/images/logo.svg"
        status='warning'
        title='Health Checks'
        region='Global'
        contactOptions={{
          discord: 'https://discord.gg/...',
          atlassian: 'https://...',
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
        <components.PageSelector
          onPageChange={handlePageChange}
          totalPages={healthChecks?.totalPages || 0}
          currentPage={page + 1}/>
      </main>
    </div>
  );
}

