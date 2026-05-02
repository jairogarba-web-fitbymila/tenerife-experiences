import { NextRequest } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getAdminUser, requireEditor, requireOwner, type AdminUser } from '@/lib/auth'

export type ActivityAction =
  | 'create'
  | 'update'
  | 'delete'
  | 'login'
  | 'logout'
  | 'login_failed'
  | 'forbidden'

export type ActivityEntity =
  | 'article'
  | 'item'
  | 'category'
  | 'event'
  | 'partner'
  | 'photo'
  | 'landing_image'
  | 'item_image'
  | 'lead'
  | 'subscriber'
  | 'contract'
  | 'invoice'
  | 'email'
  | 'outreach'
  | 'session'
  | 'auth'

export interface LogActivityParams {
  user?: AdminUser | { id?: string | null; name?: string; role?: string } | null
  action: ActivityAction
  entityType: ActivityEntity
  entityId?: string | number | null
  entityLabel?: string | null
  changes?: Record<string, unknown> | null
  metadata?: Record<string, unknown> | null
  request?: NextRequest | null
}

function getClientIp(request: NextRequest | null | undefined): string | null {
  if (!request) return null
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip')
}

/**
 * Require owner role; if the caller is authenticated but lacks it, log a
 * 'forbidden' attempt before returning null. Routes should respond with 403.
 */
export async function requireOwnerOrForbidden(
  request: NextRequest | null,
  entityType: ActivityEntity,
): Promise<AdminUser | null> {
  const owner = await requireOwner()
  if (owner) return owner
  const attempt = await getAdminUser()
  if (attempt) {
    await logActivity({
      user: attempt,
      action: 'forbidden',
      entityType,
      request,
      metadata: {
        method: request?.method,
        path: request?.nextUrl?.pathname,
        required: 'owner',
      },
    })
  }
  return null
}

/**
 * Same as requireOwnerOrForbidden but for editor-or-owner routes.
 */
export async function requireEditorOrForbidden(
  request: NextRequest | null,
  entityType: ActivityEntity,
): Promise<AdminUser | null> {
  const editor = await requireEditor()
  if (editor) return editor
  const attempt = await getAdminUser()
  if (attempt) {
    await logActivity({
      user: attempt,
      action: 'forbidden',
      entityType,
      request,
      metadata: {
        method: request?.method,
        path: request?.nextUrl?.pathname,
        required: 'editor',
      },
    })
  }
  return null
}

export async function logActivity(params: LogActivityParams): Promise<void> {
  try {
    const supabase = createAdminClient()
    await supabase.from('admin_activity_log').insert({
      user_id: params.user?.id ?? null,
      user_name: params.user?.name ?? null,
      user_role: params.user?.role ?? null,
      action: params.action,
      entity_type: params.entityType,
      entity_id: params.entityId == null ? null : String(params.entityId),
      entity_label: params.entityLabel ?? null,
      changes: params.changes ?? null,
      ip_address: getClientIp(params.request ?? null),
      user_agent: params.request?.headers.get('user-agent') ?? null,
      metadata: params.metadata ?? null,
    })
  } catch (err) {
    // Never let logging failures break the main flow
    console.error('[activity-log] failed to record activity:', err)
  }
}
