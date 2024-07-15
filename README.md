<h1>Chatfenster Testaufgabe</h1>

<p>Willkommen im Repository, das die Testaufgabe für das Chatfenster enthält</p>

<p>Dieses Projekt wurde mit den folgenden Technologien umgesetzt:</p>

<ul>
  <li>
    <strong>SvelteKit</strong>
  </li>
  <li>
    <strong>Supabase</strong>
  </li>
  <li>
    <strong>TailwindCSS</strong>
  </li>
</ul>

<h2>Setup-Anleitung</h2>

<p>
  Um sicherzustellen, dass die Anwendung korrekt funktioniert, befolgen Sie
  diese Schritte:
</p>

<ol>
  <li>
    <p><strong>Erstellen Sie ein Supabase-Projekt</strong>:</p>
    <ul>
      <li>
        Gehen Sie zu
        <a rel="noreferrer" target="_new" href="https://supabase.com"
          >supabase.com</a
        >
        und erstellen Sie ein neues Projekt.
      </li>
    </ul>
  </li>
  <li>
    <p><strong>Umgebungsvariablen</strong>:</p>
    <ul>
      <li>
        Erstellen Sie eine <code>.env</code>-Datei im Stammverzeichnis Ihres
        Projekts.
      </li>
      <li>
        Verwenden Sie die Datei <code>.env.example</code> als Referenz und geben
        Sie die entsprechenden Daten aus Ihrem Supabase-Projektdashboard ein.
      </li>
    </ul>
  </li>
  <li>
    <p><strong>Datenbankeinrichtung</strong>:</p>
    <ul>
      <li>
        <p>
          Fügen Sie die folgenden Tabellen zu Ihrer Supabase-Datenbank hinzu:
        </p>
        <p>
          <code>CREATE TABLE users ( id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL);</code>
        </p>
        <p>
          <code>CREATE TABLE messages ( id SERIAL PRIMARY KEY, text TEXT NOT NULL, user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE RESTRICT, username VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT NOW());</code>
        </p>
      </li>
    </ul>

  </li>
  <li>
    <p><strong>Aktivieren Sie Realtime</strong>:</p>
    <ul>
      <li>
        Aktivieren Sie "Realtime" für die <code>messages</code>-Tabelle in Ihrem
        Supabase-Dashboard.
      </li>
    </ul>
  </li>
  <li>
    <p><strong>Abhängigkeiten installieren</strong>:</p>
    <ul>
      <li>
        Führen Sie <code>npm install</code> aus, um die erforderlichen
        npm-Pakete zu installieren.
      </li>
    </ul>
  </li>
  <li>
    <p><strong>Anwendung starten</strong>:</p>
    <ul>
      <li>Starten Sie den Entwicklungsserver mit <code>npm run dev</code>.</li>
    </ul>
  </li>
</ol>

<h2>Gebrauchsanweisung</h2>

<p>
  Wenn Sie die Chat-Anwendung zum ersten Mal aufrufen, müssen Sie einen
  Benutzernamen für den aktuellen Benutzer auswählen.
</p>

<p>Um andere Benutzer zum Chat hinzuzufügen:</p>

<ul>
  <li>
    Klicken Sie auf die Schaltfläche neben dem Eingabefeld unten im System.
  </li>
  <li>Es wird ein neues Fenster für den neuen Benutzer erstellt.</li>
</ul>

<p>Viel Spaß mit der Chat-Anwendung!</p>
