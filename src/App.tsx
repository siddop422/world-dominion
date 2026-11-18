/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { CommandShell } from './components/layout/CommandShell';
import { WorldMapView } from './components/world-map/WorldMapView';
import { DashboardView } from './components/dashboard/DashboardView';
import {
  CompaniesView,
  CurrencyExchangeView,
  InventoryView,
  MarketplaceView,
  WorkView,
} from './components/economy/EconomyViews';
import {
  DiplomacyView,
  ElectionsView,
  LawsView,
  NationsView,
  ParliamentView,
  PartiesView,
} from './components/politics/PoliticsViews';
import { MilitaryView, WarsView } from './components/military/MilitaryViews';
import {
  ChatView,
  NotificationsView,
  PressView,
  ProfileView,
  SettingsView,
} from './components/comms/CommsViews';

function ActiveSectionRenderer() {
  const { activeSection } = useGame();

  switch (activeSection) {
    case 'dashboard':
      return <DashboardView />;
    case 'world':
      return <WorldMapView />;
    case 'profile':
      return <ProfileView />;
    case 'work':
      return <WorkView />;
    case 'companies':
      return <CompaniesView />;
    case 'inventory':
      return <InventoryView />;
    case 'local_market':
      return <MarketplaceView scope="local" />;
    case 'global_market':
      return <MarketplaceView scope="global" />;
    case 'exchange':
      return <CurrencyExchangeView />;
    case 'nations':
      return <NationsView />;
    case 'parties':
      return <PartiesView />;
    case 'elections':
      return <ElectionsView />;
    case 'parliament':
      return <ParliamentView />;
    case 'laws':
      return <LawsView />;
    case 'military':
      return <MilitaryView />;
    case 'wars':
      return <WarsView />;
    case 'diplomacy':
      return <DiplomacyView />;
    case 'press':
      return <PressView />;
    case 'chat':
      return <ChatView />;
    case 'notifications':
      return <NotificationsView />;
    case 'settings':
      return <SettingsView />;
    default:
      return <WorldMapView />;
  }
}

export default function App() {
  return (
    <GameProvider>
      <CommandShell>
        <ActiveSectionRenderer />
      </CommandShell>
    </GameProvider>
  );
}
