import { supabase } from './server-supabase.js';
import fs from 'fs';

async function exportSubscribers() {
  console.log('🔍 Fetching active subscribers from Supabase...');
  
  try {
    // Fetch all active subscribers
    const { data: subscribers, error } = await supabase
      .from('subscribers')
      .select('email, subscribed_at')
      .eq('status', 'active')
      .order('subscribed_at', { ascending: false });

    if (error) {
      console.error('❌ Error fetching subscribers:', error);
      return;
    }

    if (!subscribers || subscribers.length === 0) {
      console.log('📭 No active subscribers found');
      return;
    }

    console.log(`📊 Found ${subscribers.length} active subscribers`);

    // Create CSV content
    const csvHeader = 'email,first_name,last_name,subscribed_at\n';
    const csvContent = subscribers.map(sub => {
      // Extract potential first name from email (basic guess)
      const emailPart = sub.email.split('@')[0];
      const firstName = emailPart.charAt(0).toUpperCase() + emailPart.slice(1);
      
      return `${sub.email},${firstName},,${sub.subscribed_at || ''}`;
    }).join('\n');

    const fullCsv = csvHeader + csvContent;

    // Write to file
    const filename = `elemental-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    fs.writeFileSync(filename, fullCsv);

    console.log(`✅ Exported ${subscribers.length} subscribers to: ${filename}`);
    console.log('\n📋 Sample of exported data:');
    console.log(fullCsv.split('\n').slice(0, 4).join('\n'));
    
    console.log('\n🎯 Next steps:');
    console.log('1. Go to https://resend.com/audiences');
    console.log('2. Create a new audience called "Elemental Masters Subscribers"');
    console.log(`3. Import the ${filename} file`);
    console.log('4. Create a broadcast campaign with your Air Kingdom email');

    return filename;
  } catch (error) {
    console.error('💥 Export failed:', error);
  }
}

// Run the export
exportSubscribers(); 