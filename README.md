# kagelin-web

Homepage for [Kagelin](https://app.kagelin.app), served at the apex `kagelin.app`.

## Develop

```bash
npm install
cp .env.example .env.local   # optional for local UI work
npm run dev
```

The waitlist needs the Supabase and Turnstile keys from `.env.example` plus the
`supabase/waitlist_signups.sql` table; deploy as a separate Vercel project with
`kagelin.app` bound.

## License

<pre>
Copyright © 2026 Achyuth S.

Licensed under the GNU Affero General Public License, Version 3.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.gnu.org/licenses/agpl-3.0.en.html

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
</pre>
