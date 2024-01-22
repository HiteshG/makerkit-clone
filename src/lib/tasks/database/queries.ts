import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/database.types";
import { TASKS_TABLE } from "~/lib/db-tables";
import Task from "../types/task";

type Client = SupabaseClient<Database>;

const TASKS_PAGE_SIZE = 10;

export function getTasks(
	client: Client,
	params: {
		organizationUid: string;
		pageIndex: number;
		perPage?: number;
		query?: string;
	},
) {
	const { organizationUid, perPage, pageIndex } = params;
	const { startOffset, endOffset } = getPaginationOffsets(pageIndex, perPage);

	let query = client
		.from(TASKS_TABLE)
		.select<string, Task>(
			`
			id,
			name,
			organizationId: organization_id,
			dueDate: due_date,
			done,
			description,
			organization: organization_id !inner (
				id,
				uuid
			)
			`, { count: 'exact' }
		)
		.eq('organization.uuid', organizationUid)
		.range(startOffset, endOffset);

	if (params.query) {
		query = query.textSearch('name', params.query);
	}

	return query;
}

export function getTask(client: Client, id: number) {
	const data = client
		.from(TASKS_TABLE)
		.select(
			`
			id,
			name,
			organizationId: organization_id,
      dueDate: due_date,
      description,
      done
			`
		)
		.eq('id', id)
		.single();

	return data;
}

function getPaginationOffsets(pageIndex: number, perPage?: number) {
	const pageSize = perPage || TASKS_PAGE_SIZE;
	const startOffset = pageIndex * pageSize;
	const endOffset = startOffset + pageSize;

	return {
		startOffset,
		endOffset,
	};
}