// Data Service for managing all application data with JSON persistence
// This service handles CRUD operations for all entities

export interface DataStore {
  players: any[];
  teams: any[];
  blogPosts: any[];
  events: any[];
  users: any[];
  notifications: any[];
  teamConfigs: any[];
  lastUpdated: string;
  version: string;
}

// Default data structure
const defaultDataStore: DataStore = {
  players: [],
  teams: [],
  blogPosts: [],
  events: [],
  users: [],
  notifications: [],
  teamConfigs: [],
  lastUpdated: new Date().toISOString(),
  version: '1.0.0'
};

class DataService {
  private storageKey = 'iccwsc_data_store';
  private dataStore: DataStore;

  constructor() {
    this.dataStore = this.loadData();
  }

  // Load data from localStorage or initialize with defaults
  private loadData(): DataStore {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure all required properties exist
        return {
          ...defaultDataStore,
          ...parsed,
          lastUpdated: parsed.lastUpdated || new Date().toISOString()
        };
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
    
    // Initialize with default data if nothing exists
    const initialData = this.initializeDefaultData();
    this.saveData(initialData);
    return initialData;
  }

  // Save data to localStorage
  private saveData(data?: DataStore): void {
    try {
      const dataToSave = data || this.dataStore;
      dataToSave.lastUpdated = new Date().toISOString();
      localStorage.setItem(this.storageKey, JSON.stringify(dataToSave, null, 2));
      console.log('✅ Data saved successfully to localStorage');
    } catch (error) {
      console.error('❌ Error saving data to localStorage:', error);
    }
  }

  // Initialize with default data
  private initializeDefaultData(): DataStore {
    const initialData: DataStore = {
      ...defaultDataStore,
      users: [
        {
          username: 'admin',
          password: 'Casper@2022',
          user: {
            username: 'admin',
            role: 'admin',
            name: 'System Administrator'
          }
        }
      ],
      players: [
        // Cereal Killers players - ONLY these 14 players
        {
          id: '1',
          name: 'Naim Mohammad',
          position: 'Batsman',
          email: 'naim.mohammad@email.com',
          phone: '+1-206-555-0101',
          stats: { runs: 1456, wickets: 2, matches: 25 },
          year: '2025',
          season: 'spring',
          league: 'ARCL',
          overs: '16 overs',
          category: 'Adult',
          teamName: 'Cereal Killers'
        },
        {
          id: '2',
          name: 'Dhruva Kumar',
          position: 'Batsman',
          email: 'dhruva.kumar@email.com',
          phone: '+1-206-555-0102',
          stats: { runs: 1123, wickets: 3, matches: 26 },
          year: '2025',
          season: 'spring',
          league: 'ARCL',
          overs: '16 overs',
          category: 'Adult',
          teamName: 'Cereal Killers'
        },
        {
          id: '3',
          name: 'Darshan Masti Prakash',
          position: 'All-rounder',
          email: 'darshan.prakash@email.com',
          phone: '+1-206-555-0103',
          stats: { runs: 890, wickets: 23, matches: 30 },
          year: '2025',
          season: 'spring',
          league: 'ARCL',
          overs: '16 overs',
          category: 'Adult',
          teamName: 'Cereal Killers'
        },
        {
          id: '4',
          name: 'Vinuth Muniraju',
          position: 'Bowler',
          email: 'vinuth.muniraju@email.com',
          phone: '+1-206-555-0104',
          stats: { runs: 245, wickets: 45, matches: 29 },
          year: '2025',
          season: 'spring',
          league: 'ARCL',
          overs: '16 overs',
          category: 'Adult',
          teamName: 'Cereal Killers'
        },
        {
          id: '5',
          name: 'Uday C',
          position: 'Batsman',
          email: 'uday.c@email.com',
          phone: '+1-206-555-0105',
          stats: { runs: 1250, wickets: 5, matches: 28 },
          year: '2025',
          season: 'spring',
          league: 'ARCL',
          overs: '16 overs',
          category: 'Adult',
          teamName: 'Cereal Killers'
        },
        {
          id: '6',
          name: 'Vidhyadhar Ghorpade',
          position: 'All-rounder',
          email: 'vidhyadhar.ghorpade@email.com',
          phone: '+1-206-555-0106',
          stats: { runs: 678, wickets: 18, matches: 28 },
          year: '2025',
          season: 'spring',
          league: 'ARCL',
          overs: '16 overs',
          category: 'Adult',
          teamName: 'Cereal Killers'
        },
        {
          id: '7',
          name: 'Vijeth Shetty',
          position: 'Bowler',
          email: 'vijeth.shetty@email.com',
          phone: '+1-206-555-0107',
          stats: { runs: 156, wickets: 38, matches: 30 },
          year: '2025',
          season: 'spring',
          league: 'ARCL',
          overs: '16 overs',
          category: 'Adult',
          teamName: 'Cereal Killers'
        },
        {
          id: '8',
          name: 'Kiran S',
          position: 'Batsman',
          email: 'kiran.s@email.com',
          phone: '+1-206-555-0108',
          stats: { runs: 734, wickets: 12, matches: 27 },
          year: '2025',
          season: 'spring',
          league: 'ARCL',
          overs: '16 overs',
          category: 'Adult',
          teamName: 'Cereal Killers'
        },
        {
          id: '9',
          name: 'Manjunatha Shetty Kondalli',
          position: 'Wicket-keeper',
          email: 'manjunatha.kondalli@email.com',
          phone: '+1-206-555-0109',
          stats: { runs: 567, wickets: 0, matches: 24 },
          year: '2025',
          season: 'spring',
          league: 'ARCL',
          overs: '16 overs',
          category: 'Adult',
          teamName: 'Cereal Killers'
        },
        {
          id: '10',
          name: 'Raj Mani N',
          position: 'All-rounder',
          email: 'raj.mani@email.com',
          phone: '+1-206-555-0110',
          stats: { runs: 445, wickets: 15, matches: 18 },
          year: '2025',
          season: 'spring',
          league: 'ARCL',
          overs: '16 overs',
          category: 'Adult',
          teamName: 'Cereal Killers'
        },
        {
          id: '11',
          name: 'Arun Thippur Jayakeerthy',
          position: 'Bowler',
          email: 'arun.jayakeerthy@email.com',
          phone: '+1-206-555-0111',
          stats: { runs: 89, wickets: 32, matches: 22 },
          year: '2025',
          season: 'spring',
          league: 'ARCL',
          overs: '16 overs',
          category: 'Adult',
          teamName: 'Cereal Killers'
        },
        {
          id: '12',
          name: 'Avinash Talanki',
          position: 'All-rounder',
          email: 'avinash.talanki@email.com',
          phone: '+1-206-555-0112',
          stats: { runs: 623, wickets: 21, matches: 26 },
          year: '2025',
          season: 'spring',
          league: 'ARCL',
          overs: '16 overs',
          category: 'Adult',
          teamName: 'Cereal Killers'
        },
        {
          id: '13',
          name: 'Dhanush Shetty CK',
          position: 'Batsman',
          email: 'dhanush.shetty@email.com',
          phone: '+1-206-555-0113',
          stats: { runs: 892, wickets: 4, matches: 23 },
          year: '2025',
          season: 'spring',
          league: 'ARCL',
          overs: '16 overs',
          category: 'Adult',
          teamName: 'Cereal Killers'
        },
        {
          id: '14',
          name: 'Siva Krapa',
          position: 'Wicket-keeper',
          email: 'siva.krapa@email.com',
          phone: '+1-206-555-0114',
          stats: { runs: 456, wickets: 2, matches: 21 },
          year: '2025',
          season: 'spring',
          league: 'ARCL',
          overs: '16 overs',
          category: 'Adult',
          teamName: 'Cereal Killers'
        }
      ],
      teams: [
        // Only Cereal Killers team for now
        {
          id: '1',
          name: 'Cereal Killers',
          year: '2025',
          season: 'spring',
          league: 'ARCL',
          overs: '16 overs',
          category: 'Adult',
          stats: { matchesPlayed: 12, wins: 8, losses: 3, draws: 1, points: 17, runRate: 1.25 },
          players: 14
        }
      ],
      events: [
        {
          id: '1',
          title: 'Cereal Killers Practice Session',
          type: 'practice',
          date: new Date(2024, 11, 15).toISOString(),
          time: '18:00',
          description: 'Regular cricket practice session - batting and bowling drills for Cereal Killers team',
          teams: ['Cereal Killers'],
          location: 'Marymoor Park Cricket Ground'
        },
        {
          id: '2',
          title: 'Team Strategy Meeting',
          type: 'meeting',
          date: new Date(2024, 11, 18).toISOString(),
          time: '19:30',
          description: 'Discuss tactics for upcoming tournament matches',
          teams: ['Cereal Killers'],
          location: 'Community Center Conference Room'
        },
        {
          id: '3',
          title: 'League Match vs Seattle Strikers',
          type: 'match',
          date: new Date(2024, 11, 22).toISOString(),
          time: '15:00',
          description: 'ARCL 16-over league match at Marymoor Park Cricket Ground',
          teams: ['Cereal Killers'],
          location: 'Marymoor Park Cricket Ground'
        }
      ],
      blogPosts: [
        {
          id: '1',
          title: 'Cereal Killers Dominate Spring League with Spectacular Victory',
          content: `What a match it was! Our Cereal Killers team showcased exceptional cricket skills in yesterday's match against the Seattle Strikers. The team's performance was nothing short of spectacular, with outstanding contributions from both batsmen and bowlers.

**Match Highlights:**

The match began with our captain winning the toss and choosing to bat first. Our opening pair got off to a flying start, putting up 50 runs in the first 6 overs. Naim Mohammad played a magnificent innings, scoring 78 runs off just 45 balls, including 6 boundaries and 3 sixes.

**Bowling Excellence:**

Our bowling attack was equally impressive. Vinuth Muniraju's spell of 4 wickets for 25 runs in his 4 overs was the highlight of our bowling performance. The team's fielding was sharp, with two brilliant run-outs that changed the momentum of the game.

**Team Spirit:**

What made this victory even more special was the team spirit displayed throughout the match. Every player contributed to the win, whether with the bat, ball, or in the field. This is what ICCWSC cricket is all about - playing as a unit and supporting each other.

**Looking Ahead:**

With this victory, we move to the top of the league table. Our next match is against the Redmond Royals next weekend. The team is confident and ready to continue this winning streak.

Come and support your team! Let's fill the stands with orange and green!`,
          excerpt: 'Our Cereal Killers team delivered a spectacular performance against Seattle Strikers, showcasing the true spirit of ICCWSC cricket with outstanding batting, bowling, and fielding.',
          author: {
            name: 'Naim Mohammad',
            username: 'naim.mohammad',
            role: 'captain'
          },
          category: 'match-report',
          tags: ['victory', 'spring-league', 'cereal-killers', 'team-performance'],
          publishedAt: new Date('2024-12-20T10:30:00').toISOString(),
          isPublished: true,
          likes: 24,
          comments: [],
          readTime: 3
        },
        {
          id: '2',
          title: 'Player Spotlight: Darshan Masti Prakash - The All-Rounder Excellence',
          content: `This month, we're excited to spotlight one of our most versatile cricketers - Darshan Masti Prakash. As an all-rounder for the Cereal Killers, Darshan has consistently delivered outstanding performances with both bat and ball.

**Cricket Journey:**

Darshan brings years of cricket experience from India, where he honed his skills playing in local leagues. "Cricket has always been my passion," says Darshan. "Joining ICCWSC and the Cereal Killers has given me the opportunity to continue playing the sport I love while building new friendships."

**Outstanding Performance:**

In this season alone, Darshan has scored 890 runs and taken 23 wickets across 30 matches. His all-rounder capabilities make him an invaluable asset to the Cereal Killers team. His recent performance in the ARCL 16-over league has been particularly impressive.

**Training and Dedication:**

"Darshan is always working on improving his game," says his teammate Vinuth Muniraju. "His dedication to both batting and bowling is inspiring. He practices regularly and is always willing to help younger players."

**Future Goals:**

When asked about his cricket aspirations, Darshan says, "I want to help the Cereal Killers win the championship and continue contributing to ICCWSC's success. Cricket teaches you discipline and teamwork, values that extend beyond the field."

**Team Contribution:**

Beyond his on-field performance, Darshan is known for his leadership qualities and positive attitude. He often mentors new players and helps maintain team morale during challenging matches.

We're proud to have Darshan as part of the Cereal Killers and look forward to his continued excellence on the cricket field.`,
          excerpt: 'Meet Darshan Masti Prakash, our versatile all-rounder who has scored 890 runs and taken 23 wickets this season while inspiring teammates with his dedication.',
          author: {
            name: 'Uday C',
            username: 'uday.c',
            role: 'member'
          },
          category: 'player-spotlight',
          tags: ['player-spotlight', 'all-rounder', 'cereal-killers', 'inspiration'],
          publishedAt: new Date('2024-12-18T14:20:00').toISOString(),
          isPublished: true,
          likes: 31,
          comments: [],
          readTime: 4
        }
      ]
    };

    return initialData;
  }

  // Generic CRUD operations
  public getAll<T>(entityType: keyof DataStore): T[] {
    return this.dataStore[entityType] as T[];
  }

  public getById<T>(entityType: keyof DataStore, id: string): T | undefined {
    const entities = this.dataStore[entityType] as any[];
    return entities.find(entity => entity.id === id);
  }

  public add<T extends { id: string }>(entityType: keyof DataStore, entity: T): T {
    const entities = this.dataStore[entityType] as T[];
    entities.push(entity);
    this.saveData();
    console.log(`✅ Added new ${entityType}:`, entity.id);
    return entity;
  }

  public update<T extends { id: string }>(entityType: keyof DataStore, id: string, updates: Partial<T>): T | null {
    const entities = this.dataStore[entityType] as T[];
    const index = entities.findIndex(entity => entity.id === id);
    
    if (index === -1) {
      console.error(`❌ ${entityType} with id ${id} not found`);
      return null;
    }

    entities[index] = { ...entities[index], ...updates };
    this.saveData();
    console.log(`✅ Updated ${entityType}:`, id);
    return entities[index];
  }

  public delete(entityType: keyof DataStore, id: string): boolean {
    const entities = this.dataStore[entityType] as any[];
    const index = entities.findIndex(entity => entity.id === id);
    
    if (index === -1) {
      console.error(`❌ ${entityType} with id ${id} not found`);
      return false;
    }

    entities.splice(index, 1);
    this.saveData();
    console.log(`✅ Deleted ${entityType}:`, id);
    return true;
  }

  // Bulk operations
  public bulkAdd<T extends { id: string }>(entityType: keyof DataStore, entities: T[]): T[] {
    const existingEntities = this.dataStore[entityType] as T[];
    existingEntities.push(...entities);
    this.saveData();
    console.log(`✅ Bulk added ${entities.length} ${entityType}`);
    return entities;
  }

  public bulkUpdate<T extends { id: string }>(entityType: keyof DataStore, updates: Array<{ id: string; data: Partial<T> }>): T[] {
    const entities = this.dataStore[entityType] as T[];
    const updatedEntities: T[] = [];

    updates.forEach(({ id, data }) => {
      const index = entities.findIndex(entity => entity.id === id);
      if (index !== -1) {
        entities[index] = { ...entities[index], ...data };
        updatedEntities.push(entities[index]);
      }
    });

    this.saveData();
    console.log(`✅ Bulk updated ${updatedEntities.length} ${entityType}`);
    return updatedEntities;
  }

  public bulkDelete(entityType: keyof DataStore, ids: string[]): number {
    const entities = this.dataStore[entityType] as any[];
    let deletedCount = 0;

    ids.forEach(id => {
      const index = entities.findIndex(entity => entity.id === id);
      if (index !== -1) {
        entities.splice(index, 1);
        deletedCount++;
      }
    });

    this.saveData();
    console.log(`✅ Bulk deleted ${deletedCount} ${entityType}`);
    return deletedCount;
  }

  // Search and filter operations
  public search<T>(entityType: keyof DataStore, searchFn: (entity: T) => boolean): T[] {
    const entities = this.dataStore[entityType] as T[];
    return entities.filter(searchFn);
  }

  public filter<T>(entityType: keyof DataStore, filters: Record<string, any>): T[] {
    const entities = this.dataStore[entityType] as T[];
    return entities.filter(entity => {
      return Object.entries(filters).every(([key, value]) => {
        if (value === '' || value === null || value === undefined) return true;
        return (entity as any)[key] === value;
      });
    });
  }

  // Data management operations
  public exportData(): string {
    return JSON.stringify(this.dataStore, null, 2);
  }

  public importData(jsonData: string): boolean {
    try {
      const importedData = JSON.parse(jsonData);
      
      // Validate the structure
      if (!importedData || typeof importedData !== 'object') {
        throw new Error('Invalid data format');
      }

      // Merge with default structure to ensure all properties exist
      this.dataStore = {
        ...defaultDataStore,
        ...importedData,
        lastUpdated: new Date().toISOString()
      };

      this.saveData();
      console.log('✅ Data imported successfully');
      return true;
    } catch (error) {
      console.error('❌ Error importing data:', error);
      return false;
    }
  }

  public resetData(): void {
    this.dataStore = this.initializeDefaultData();
    this.saveData();
    console.log('✅ Data reset to defaults');
  }

  public getDataInfo(): { size: string; lastUpdated: string; version: string; entities: Record<string, number> } {
    const dataString = JSON.stringify(this.dataStore);
    const sizeInBytes = new Blob([dataString]).size;
    const sizeInKB = (sizeInBytes / 1024).toFixed(2);

    const entities: Record<string, number> = {};
    Object.keys(this.dataStore).forEach(key => {
      if (Array.isArray(this.dataStore[key as keyof DataStore])) {
        entities[key] = (this.dataStore[key as keyof DataStore] as any[]).length;
      }
    });

    return {
      size: `${sizeInKB} KB`,
      lastUpdated: this.dataStore.lastUpdated,
      version: this.dataStore.version,
      entities
    };
  }

  // Backup and restore
  public createBackup(): string {
    const backup = {
      ...this.dataStore,
      backupCreatedAt: new Date().toISOString(),
      backupVersion: this.dataStore.version
    };
    return JSON.stringify(backup, null, 2);
  }

  public restoreFromBackup(backupData: string): boolean {
    try {
      const backup = JSON.parse(backupData);
      
      if (!backup || !backup.backupCreatedAt) {
        throw new Error('Invalid backup format');
      }

      // Remove backup metadata
      delete backup.backupCreatedAt;
      delete backup.backupVersion;

      this.dataStore = {
        ...defaultDataStore,
        ...backup,
        lastUpdated: new Date().toISOString()
      };

      this.saveData();
      console.log('✅ Data restored from backup');
      return true;
    } catch (error) {
      console.error('❌ Error restoring from backup:', error);
      return false;
    }
  }

  // Validation
  public validateData(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check required properties
    const requiredProperties: (keyof DataStore)[] = ['players', 'teams', 'blogPosts', 'events', 'users'];
    requiredProperties.forEach(prop => {
      if (!Array.isArray(this.dataStore[prop])) {
        errors.push(`Missing or invalid ${prop} array`);
      }
    });

    // Check for duplicate IDs within each entity type
    requiredProperties.forEach(entityType => {
      const entities = this.dataStore[entityType] as any[];
      const ids = entities.map(entity => entity.id).filter(id => id);
      const uniqueIds = new Set(ids);
      if (ids.length !== uniqueIds.size) {
        errors.push(`Duplicate IDs found in ${entityType}`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// Create and export singleton instance
export const dataService = new DataService();

// Export types for use in components
export type { DataStore };