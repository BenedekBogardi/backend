import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

// Ez a fájl definiálja a @Roles dekorátort:
//   Az adott végponthoz milyen szerepkör szükséges
// Tényleges ellenőrzést nem végez!

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

