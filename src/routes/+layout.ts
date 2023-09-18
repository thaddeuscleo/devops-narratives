import type { PageLoad } from "./$types"

export const load: PageLoad = ({ url }: { url: { pathname: string } }) => {
    return {
        url: url.pathname
    }
}
