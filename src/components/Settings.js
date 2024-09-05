function Settings() {
    return (
      <div className="bg-gray-800 text-white p-4">
        <h2 className="text-xl mb-4">Settings</h2>
        <ul className="space-y-2">
          <li>
            <button className="w-full text-left py-2 px-4 bg-gray-700 rounded">Account</button>
          </li>
          <li>
            <button className="w-full text-left py-2 px-4 bg-gray-700 rounded">Notifications</button>
          </li>
          <li>
            <button className="w-full text-left py-2 px-4 bg-gray-700 rounded">Appearance</button>
          </li>
          <li>
            <button className="w-full text-left py-2 px-4 bg-gray-700 rounded">Privacy</button>
          </li>
          <li>
            <button className="w-full text-left py-2 px-4 bg-gray-700 rounded">Help & Support</button>
          </li>
        </ul>
      </div>
    );
  }

export default Settings;